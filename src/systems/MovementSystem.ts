import { Direction } from '@root/components/enums'
import Movement from '@root/components/Movement'
import Phaser from 'phaser'

export default class MovementSystem {
  constructor(
    private sprite: Phaser.Physics.Arcade.Sprite,
    private movement: Movement
  ) {}

  public update() {
    if (!this.sprite) {
      return
    }

    const speed = this.movement.speed
    if (speed === 0) {
      this.sprite.setVelocity(0, 0)
      return
    }
    switch (this.movement.direction) {
      case Direction.UP:
        this.sprite.setVelocity(0, -speed)
        break
      case Direction.RIGHT:
        this.sprite.setVelocity(speed, 0)
        this.sprite.setFlipX(false)
        break
      case Direction.DOWN:
        this.sprite.setVelocity(0, speed)
        break
      case Direction.LEFT:
        this.sprite.setVelocity(-speed, 0)
        this.sprite.setFlipX(true)
        break
    }
  }
}
