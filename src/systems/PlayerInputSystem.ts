import { Direction } from '@root/components/enums'
import PlayerInput from '@root/components/PlayerInput'
import Phaser from 'phaser'

export default class PlayerInputSystem {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(
    sprite: Phaser.Physics.Arcade.Sprite,
    private input: PlayerInput
  ) {
    this.cursors = sprite.scene.input.keyboard.createCursorKeys()
  }

  public update(): void {
    if (this.cursors.up.isDown) {
      this.input.direction = Direction.UP
    } else if (this.cursors.right.isDown) {
      this.input.direction = Direction.RIGHT
    } else if (this.cursors.down.isDown) {
      this.input.direction = Direction.DOWN
    } else if (this.cursors.left.isDown) {
      this.input.direction = Direction.LEFT
    } else {
      this.input.direction = Direction.NONE
    }
  }
}
