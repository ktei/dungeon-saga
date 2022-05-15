import Component from '@root/components/Component'
import { GameObject } from '@root/components/GameObjects'
import { Sprite, Image, Direction } from '@root/components/types'

export default class Movement implements Component {
  constructor(private g: GameObject<Sprite | Image>) {}

  public update() {
    if (!this.g.engine || !this.g.movement) {
      return
    }

    const {
      engine,
      movement,
      movement: { speed }
    } = this.g
    if (speed === 0) {
      engine.setVelocity(0, 0)
      return
    }
    switch (movement.direction) {
      case Direction.UP:
        engine.setVelocity(0, -speed)
        break
      case Direction.RIGHT:
        engine.setVelocity(speed, 0)
        engine.setFlipX(false)
        break
      case Direction.DOWN:
        engine.setVelocity(0, speed)
        break
      case Direction.LEFT:
        engine.setVelocity(-speed, 0)
        engine.setFlipX(true)
        break
    }
  }
}
