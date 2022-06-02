import AnimKeys from '@/anims/AnimKeys'
import { EntityComponent } from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Sprite } from '@/components/types'

export default class FauneAnimation extends EntityComponent<Sprite> {
  constructor(e: Entity<Sprite>) {
    super(e)
  }

  public update(): void {
    if (!this.entity.engine) {
      return
    }

    const {
      movement: { speed },
      engine
    } = this.entity
    engine.play(speed > 0 ? AnimKeys.Lizard.Run : AnimKeys.Lizard.Idle)
  }
}
