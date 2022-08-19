import { EntityComponent } from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Direction, GameObject } from '@/components/types'

export default class Input extends EntityComponent<GameObject> {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(e: Entity<GameObject>) {
    super(e)
    this.cursors = this.entity.engine.scene.input.keyboard.createCursorKeys()
  }

  public update(): void {
    this.entity.input = this.entity.input ?? { direction: Direction.DOWN }
    if (this.cursors.up.isDown) {
      this.entity.input.direction = Direction.UP
    } else if (this.cursors.right.isDown) {
      this.entity.input.direction = Direction.RIGHT
    } else if (this.cursors.down.isDown) {
      this.entity.input.direction = Direction.DOWN
    } else if (this.cursors.left.isDown) {
      this.entity.input.direction = Direction.LEFT
    }
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.entity.input.spaceDown = true
    }
  }
}
