import Component from '@root/components/Component'
import { GameObject } from '@root/components/GameObjects'
import { Sprite } from '@root/components/types'

export default class Animation implements Component {
  constructor(private g: GameObject<Sprite>) {}

  public update() {
    if (!this.g.engine) {
      return
    }

    const key = this.g.getAnimKey()
    if (!key) {
      return
    }
    this.g.engine.play(key, true)
  }
}
