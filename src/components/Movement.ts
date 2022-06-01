import Component from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Sprite, Image, Direction } from '@/components/types'

export default class Movement implements Component {
  constructor(private g: Entity<Sprite | Image>) {}

  public update() {
    if (!this.g.engine || !this.g.movement) {
      return
    }

    const {
      engine,
      movement: { speed, direction }
    } = this.g
    if (speed === 0) {
      engine.setVelocity(0, 0)
      return
    }
    switch (direction) {
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
