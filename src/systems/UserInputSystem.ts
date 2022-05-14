import { Direction } from '@root/components/enums'
import UserInput from '@root/components/UserInput'
import Phaser from 'phaser'

export default class UserInputSystem {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(sprite: Phaser.Physics.Arcade.Sprite, private input: UserInput) {
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
