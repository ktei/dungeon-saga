import AnimKeys from '@root/anims/AnimKeys'
import Input from '@root/components/Input'
import Movement from '@root/components/Movement'
import { GameObject } from '@root/components/GameObjects'
import Player from '@root/components/Player'
import { Direction, Sprite } from '@root/components/types'
import Component from '@root/components/Component'

export default class Faune extends GameObject<Sprite> {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene.physics.add.sprite(x, y, 'faune', undefined))
    this.movement.direction = Direction.DOWN
    this.engine.body.setSize(16, 16)
    this.addComponent(new Input(this))
    this.addComponent(new Player(this))
    this.addComponent(new Movement(this))
    this.addComponent(new FauneAnimation(this))
  }
}

class FauneAnimation implements Component {
  constructor(private g: GameObject<Sprite>) {}

  public update(): void {
    if (!this.g.engine) {
      return
    }

    const {
      movement: { speed, direction },
      engine
    } = this.g
    if (speed > 0) {
      switch (direction) {
        case Direction.UP:
          engine.play(AnimKeys.Faune.RunUp, true)
          break
        case Direction.LEFT:
        case Direction.RIGHT:
          engine.play(AnimKeys.Faune.RunSide, true)
          break
        case Direction.DOWN:
          engine.play(AnimKeys.Faune.RunDown, true)
          break
      }
    } else {
      switch (direction) {
        case Direction.UP:
          engine.play(AnimKeys.Faune.IdleUp, true)
          break
        case Direction.LEFT:
        case Direction.RIGHT:
          engine.play(AnimKeys.Faune.IdleSide, true)
          break
        case Direction.DOWN:
          engine.play(AnimKeys.Faune.IdleDown, true)
          break
      }
    }
  }
}
