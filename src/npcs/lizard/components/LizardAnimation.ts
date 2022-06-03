import AnimKeys from '@/anims/AnimKeys'
import { EntityComponent } from '@/components/Component'
import { Sprite } from '@/components/types'

export default class LizardAnimation extends EntityComponent<Sprite> {
  public update(): void {
    if (!this.entity.engine) {
      return
    }

    const {
      movement: { speed },
      engine
    } = this.entity
    engine.play(speed > 0 ? AnimKeys.Lizard.Run : AnimKeys.Lizard.Idle, true)
  }
}
