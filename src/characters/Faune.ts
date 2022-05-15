import AnimKeys from '@root/anims/AnimKeys'
import Animation from '@root/components/Animation'
import Input from '@root/components/Input'
import Movement from '@root/components/Movement'
import { GameObject } from '@root/components/GameObjects'
import Player from '@root/components/Player'
import { Direction, Sprite } from '@root/components/types'

export default class Faune extends GameObject<Sprite> {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene.physics.add.sprite(x, y, 'faune', undefined))
    this.engine.body.setSize(16, 16)
    this.addComponent(new Input(this))
    this.addComponent(new Player(this))
    this.addComponent(new Movement(this))
    this.addComponent(new Animation(this))
  }

  public getAnimKey(): string | null {
    if (this.movement.speed > 0) {
      switch (this.movement.direction) {
        case Direction.UP:
          return AnimKeys.Faune.RunUp
        case Direction.LEFT:
        case Direction.RIGHT:
          return AnimKeys.Faune.RunSide
        case Direction.DOWN:
          return AnimKeys.Faune.RunDown
      }
    } else {
      switch (this.movement.direction) {
        case Direction.UP:
          return AnimKeys.Faune.IdleUp
        case Direction.LEFT:
        case Direction.RIGHT:
          return AnimKeys.Faune.IdleSide
        case Direction.DOWN:
          return AnimKeys.Faune.IdleDown
      }
    }
    return null
  }
}

// Phaser.GameObjects.GameObjectFactory.register(
//   'faune',
//   function (
//     this: Phaser.GameObjects.GameObjectFactory,
//     x: number,
//     y: number,
//     texture: string,
//     frame?: string | number
//   ) {
//     const sprite = new Faune(this.scene, x, y, texture, frame)

//     this.displayList.add(sprite)
//     this.updateList.add(sprite)

//     this.scene.physics.world.enableBody(
//       sprite,
//       Phaser.Physics.Arcade.DYNAMIC_BODY
//     )

//     sprite.body.setSize(16, 16)

//     return sprite
//   }
// )
