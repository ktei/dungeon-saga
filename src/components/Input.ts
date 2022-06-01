import Component from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Sprite, Image, Direction } from '@/components/types'

export default class Input implements Component {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(private g: Entity<Sprite | Image>) {
    this.cursors = g.engine.scene.input.keyboard.createCursorKeys()
  }

  public update(): void {
    this.g.input = this.g.input ?? { direction: Direction.NONE }
    if (this.cursors.up.isDown) {
      this.g.input.direction = Direction.UP
    } else if (this.cursors.right.isDown) {
      this.g.input.direction = Direction.RIGHT
    } else if (this.cursors.down.isDown) {
      this.g.input.direction = Direction.DOWN
    } else if (this.cursors.left.isDown) {
      this.g.input.direction = Direction.LEFT
    } else {
      this.g.input.direction = Direction.NONE
    }
  }
}
