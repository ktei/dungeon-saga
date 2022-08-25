import { createAnims } from '@/anims/animsFactory'
import '@/characters/faune/Faune'
import Faune from '@/characters/faune/Faune'
import { Direction, World } from '@/components/types'
import { ARCADE_GROUP_ADDED, RECEIVE_DATA, SEND_DATA } from '@/events/constants'
import { emitter } from '@/events/hub'
import { ArcadeGroupAddedEvent, GameData } from '@/events/payloads'
import Lizard from '@/npcs/lizard/Lizard'
import GameScene from '@/scenes/GameScene'
import Phaser from 'phaser'

export default class Dungeon extends GameScene implements World {
  private faune!: Faune
  private sendDataEvent!: Phaser.Time.TimerEvent
  private _wallsLayer!: Phaser.Tilemaps.TilemapLayer

  constructor() {
    super('dungeon')
  }

  create() {
    createAnims(this.anims)

    const map = this.make.tilemap({ key: 'dungeon' })
    const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16)

    map.createLayer('Ground', tileset)
    this._wallsLayer = map.createLayer('Walls', tileset)
    this._wallsLayer.setCollisionByProperty({ collides: true })

    // put some lizards
    const lizards = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      createCallback: g => {
        const lizard = g as Phaser.Physics.Arcade.Sprite
        lizard.body.onCollide = true
      }
    })

    emitter.on(ARCADE_GROUP_ADDED, e => {
      console.log('ARCADE_GROUP_ADDED')
      const payload = e as ArcadeGroupAddedEvent
      if (payload.name === 'knives') {
        this.physics.add.collider(
          payload.group,
          lizards,
          (
            obj1: Phaser.GameObjects.GameObject,
            obj2: Phaser.GameObjects.GameObject
          ) => {
            payload.group.killAndHide(obj1)
            lizards.killAndHide(obj2)
            lizards.killAndHide(obj2)
            ;(obj2 as Phaser.Physics.Arcade.Sprite).disableBody(true, true)
          },
          undefined,
          this
        )
      }
    })

    this.addEntities((this.faune = new Faune(this, 128, 128)))

    this.addEntities(
      new Lizard(lizards, 256, 256),
      new Lizard(lizards, 450, 312)
    )

    this.cameras.main.startFollow(
      this.faune.engine,
      true,
      undefined,
      undefined,
      -100,
      -150
    )

    this.physics.add.collider(this.faune.engine, this._wallsLayer)
    this.physics.add.collider(lizards, this._wallsLayer)
    this.physics.add.collider(
      lizards,
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

  public get wallsLayer(): Phaser.Tilemaps.TilemapLayer {
    return this._wallsLayer
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
