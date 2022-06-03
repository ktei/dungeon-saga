import { EntityComponent } from '@/components/Component'
import { Direction, Sprite } from '@/components/types'

export default class Player extends EntityComponent<Sprite> {
  public update(): void {
    const { input } = this.entity
    if (!input) {
      return
    }
    switch (input.direction) {
      case Direction.UP:
        this.moveUp()
        break
      case Direction.RIGHT:
        this.moveRight()
        break
      case Direction.DOWN:
        this.moveDown()
        break
      case Direction.LEFT:
        this.moveLeft()
        break
      default:
        this.stop()
    }
  }

  private moveUp(): void {
    this.entity.movement.direction = Direction.UP
    this.entity.movement.speed = 100
  }

  private moveRight(): void {
    this.entity.movement.direction = Direction.RIGHT
    this.entity.movement.speed = 100
  }

  private moveDown(): void {
    this.entity.movement.direction = Direction.DOWN
    this.entity.movement.speed = 100
  }

  private moveLeft(): void {
    this.entity.movement.direction = Direction.LEFT
    this.entity.movement.speed = 100
  }

  private stop(): void {
    this.entity.movement.speed = 0
  }
}
