import Animation from '@root/components/Animation'
import Phaser from 'phaser'

export default class AnimationSystem {
  constructor(
    private sprite: Phaser.Physics.Arcade.Sprite,
    private animation: Animation
  ) {}

  public update() {
    if (!this.sprite) {
      return
    }
    if (!this.animation?.key) {
      return
    }
    this.sprite.play(this.animation.key, true)
  }
}
