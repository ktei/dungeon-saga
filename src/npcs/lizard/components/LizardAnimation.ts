import AnimKeys from '@/anims/AnimKeys'
import Component from '@/components/Component'
import { GameObject } from '@/components/GameObjects'
import { Sprite } from '@/components/types'

export default class FauneAnimation implements Component {
  constructor(private g: GameObject<Sprite>) {}

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
