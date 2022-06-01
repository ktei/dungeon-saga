import AnimKeys from '@/anims/AnimKeys'
import Component from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Sprite } from '@/components/types'

export default class FauneAnimation implements Component {
  constructor(private g: Entity<Sprite>) {}

  public update(): void {
    if (!this.g.engine) {
      return
    }

    const {
      movement: { speed },
      engine
    } = this.g
    engine.play(speed > 0 ? AnimKeys.Lizard.Run : AnimKeys.Lizard.Idle)
  }
}
