import { createAnims } from '@/anims/animsFactory'
import '@/characters/faune/Faune'
import Faune from '@/characters/faune/Faune'
import { Direction } from '@/components/types'
import { RECEIVE_DATA, SEND_DATA } from '@/events/constants'
import { emitter } from '@/events/hub'
import { GameData } from '@/events/payloads'
import Lizard from '@/npcs/lizard/Lizard'
import GameScene from '@/scenes/GameScene'
import Phaser from 'phaser'

export default class Dungeon extends GameScene {
  private faune!: Faune
  private sendDataEvent!: Phaser.Time.TimerEvent

  constructor() {
    super('dungeon')
  }

  create() {
    createAnims(this.anims)

    const map = this.make.tilemap({ key: 'dungeon' })
    const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16)

    map.createLayer('Ground', tileset)
    const wallsLayer = map.createLayer('Walls', tileset)
    wallsLayer.setCollisionByProperty({ collides: true })

    this.addEntities((this.faune = new Faune(this, 128, 128)))

    // put some lizards
    const lizardsGroup = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      createCallback: g => {
        const lizard = g as Phaser.Physics.Arcade.Sprite
        lizard.body.onCollide = true
      }
    })

    this.addEntities(
      new Lizard(lizardsGroup, 256, 256),
      new Lizard(lizardsGroup, 450, 312)
    )

    this.cameras.main.startFollow(
      this.faune.engine,
      true,
      undefined,
      undefined,
      -100,
      -150
    )

    this.physics.add.collider(this.faune.engine, wallsLayer)
    this.physics.add.collider(lizardsGroup, wallsLayer)
    this.physics.add.collider(
      lizardsGroup,
      this.faune.engine,
      undefined,
      undefined,
      this
    )

    this.sendDataEvent = this.time.addEvent({
      delay: 200,
      callback: this.sendData,
      loop: true
    })

    this.events.on(Phaser.Scenes.Events.DESTROY, () => {
      this.sendDataEvent?.destroy()
    })

    emitter.on(RECEIVE_DATA, (data: unknown) => {
      const directions = data as Record<number, Direction>
      Object.keys(directions).forEach(id => {
        const e = this.findEntityById(parseInt(id, 10))
        if (e) {
          e.movement.direction = directions[parseInt(id, 10)]
        }
      })
    })
  }

  private sendData = () => {
    const payload: GameData = this.findEntitiesByName('lizard').map(e => ({
      id: e.id,
      name: e.name,
      x: e.engine.x,
      y: e.engine.y,
      direction: e.movement.direction,
      collision: e.movement.collision
        ? {
            id: e.movement.collision.id,
            collidedWith: e.movement.collision.collidedWith,
            x: e.movement.collision.coord.x,
            y: e.movement.collision.coord.y
          }
        : undefined
    }))
    emitter.emit(SEND_DATA, payload)
  }
}
