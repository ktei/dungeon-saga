import AnimKeys from '@root/anims/AnimKeys'
import Animation from '@root/components/Animation'
import { Direction } from '@root/components/enums'
import Movement from '@root/components/Movement'
import UserInput from '@root/components/UserInput'

export default class PlayerSystem {
  constructor(
    private userInput: UserInput,
    private movement: Movement,
    private animation: Animation
  ) {}

  public update(): void {
    switch (this.userInput.direction) {
      case Direction.UP:
        this.movement.direction = Direction.UP
        this.movement.speed = 100
        this.animation.key = AnimKeys.Faune.RunUp
        break
      case Direction.RIGHT:
        this.movement.direction = Direction.RIGHT
        this.movement.speed = 100
        this.animation.key = AnimKeys.Faune.RunSide
        break
      case Direction.DOWN:
        this.movement.direction = Direction.DOWN
        this.movement.speed = 100
        this.animation.key = AnimKeys.Faune.RunDown
        break
      case Direction.LEFT:
        this.movement.direction = Direction.LEFT
        this.movement.speed = 100
        this.animation.key = AnimKeys.Faune.RunSide
        break
      default:
        this.movement.speed = 0
        switch (this.movement.direction) {
          case Direction.UP:
            this.animation.key = AnimKeys.Faune.IdleUp
            break
          case Direction.RIGHT:
            this.animation.key = AnimKeys.Faune.IdleSide
            break
          case Direction.DOWN:
            this.animation.key = AnimKeys.Faune.IdleDown
            break
          case Direction.LEFT:
            this.animation.key = AnimKeys.Faune.IdleSide
            break
        }
    }
  }
}
