import { EntityComponent } from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Direction, GameObject } from '@/components/types'

export default class Movement extends EntityComponent<GameObject> {
  constructor(e: Entity<GameObject>) {
    super(e)
  }

  public update() {
    if (!this.entity.engine || !this.entity.movement) {
      return
    }

    const {
      engine,
      movement: { speed, direction }
    } = this.entity
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
