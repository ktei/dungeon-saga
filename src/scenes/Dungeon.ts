import { createAnims } from '@/anims/animsFactory'
import '@/characters/faune/Faune'
import Faune from '@/characters/faune/Faune'
import { emitter } from '@/events/hub'
import { SEND_DATA } from '@/events/types'
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
      delay: 1000,
      callback: this.sendData,
      loop: true
    })

    this.events.on(Phaser.Scenes.Events.DESTROY, () => {
      this.sendDataEvent?.destroy()
    })
  }

  private sendData = () => {
    const payload = this.findEntitiesByName('lizard')
      .map(e => ({
        id: e.id,
        x: e.engine.x,
        y: e.engine.y,
        direction: e.movement.direction
      }))
      .reduce(
        (prev, curr) => ({
          ...prev,
          [curr.id]: {
            coord: {
              x: curr.x,
              y: curr.y
            },
            direction: curr.direction,
            is_collided: false
          }
        }),
        {}
      )
    emitter.emit(SEND_DATA, payload)
  }
}
