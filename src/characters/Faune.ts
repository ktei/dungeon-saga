import AnimKeys from '@root/anims/AnimKeys'
import Animation from '@root/components/Animation'
import UserInput from '@root/components/UserInput'
import Movement from '@root/components/Movement'
import AnimationSystem from '@root/systems/AnimationSystem'
import MovementSystem from '@root/systems/MovementSystem'
import UserInputSystem from '@root/systems/UserInputSystem'
import PlayerSystem from '@root/systems/PlayerSystem'
import { Direction } from '@root/components/enums'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      faune(
        x: number,
        y: number,
        texture: string,
        frame?: string | number
      ): Faune
    }
  }
}

export default class Faune extends Phaser.Physics.Arcade.Sprite {
  private animation: Animation = {
    key: AnimKeys.Faune.IdleDown
  }
  private movement: Movement = {
    speed: 0,
    direction: Direction.DOWN
  }
  private userInput: UserInput = {
    direction: Direction.NONE
  }
  private animationSystem: AnimationSystem
  private movementSystem: MovementSystem
  private inputSystem: UserInputSystem
  private playerSystem: PlayerSystem

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)
    this.animationSystem = new AnimationSystem(this, this.animation)
    this.movementSystem = new MovementSystem(this, this.movement)
    this.inputSystem = new UserInputSystem(this, this.userInput)

    this.playerSystem = new PlayerSystem(
      this.userInput,
      this.movement,
      this.animation
    )
  }

  public update(): void {
    // console.log(this.userInput.direction)
    this.playerSystem.update()
    this.inputSystem.update()
    this.movementSystem.update()
    this.animationSystem.update()
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  'faune',
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    const sprite = new Faune(this.scene, x, y, texture, frame)

    this.displayList.add(sprite)
    this.updateList.add(sprite)

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    )

    sprite.body.setSize(16, 16)

    return sprite
  }
)
