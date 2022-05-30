import Component from '@/components/Component'
import { GameObject } from '@/components/GameObjects'
import { Direction, Sprite } from '@/components/types'

export default class Player implements Component {
  constructor(private g: GameObject<Sprite>) {}

  public update(): void {
    const { input } = this.g
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
    this.g.movement.direction = Direction.UP
    this.g.movement.speed = 100
  }

  private moveRight(): void {
    this.g.movement.direction = Direction.RIGHT
    this.g.movement.speed = 100
  }

  private moveDown(): void {
    this.g.movement.direction = Direction.DOWN
    this.g.movement.speed = 100
  }

  private moveLeft(): void {
    this.g.movement.direction = Direction.LEFT
    this.g.movement.speed = 100
  }

  private stop(): void {
    this.g.movement.speed = 0
  }
}
