import AnimKeys from '@/anims/AnimKeys'
import { Entity } from '@/components/Entity'
import { Direction, Sprite } from '@/components/types'
import Component from '@/components/Component'

export default class FauneAnimation implements Component {
  constructor(private g: Entity<Sprite>) {}

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
