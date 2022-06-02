import AnimKeys from '@/anims/AnimKeys'
import { Entity } from '@/components/Entity'
import { Direction, Sprite } from '@/components/types'
import { EntityComponent } from '@/components/Component'

export default class FauneAnimation extends EntityComponent<Sprite> {
  constructor(e: Entity<Sprite>) {
    super(e)
  }

  public update(): void {
    if (!this.entity.engine) {
      return
    }

    const {
      movement: { speed, direction },
      engine
    } = this.entity
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
