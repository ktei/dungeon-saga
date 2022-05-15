import Component from '@root/components/Component'
import {
  Sprite,
  Image,
  Direction,
  Movement,
  PlayerInput
} from '@root/components/types'

export abstract class GameObject<T extends Sprite | Image>
  implements Component
{
  public movement: Movement
  public input?: PlayerInput
  private components: Component[]

  constructor(public engine: T) {
    this.movement = {
      speed: 0,
      direction: Direction.NONE
    }
    this.components = []
  }

  public update(time: number, delta: number): void {
    this.components.forEach(x => x.update(time, delta))
  }

  protected addComponent(component: Component): void {
    this.components.push(component)
  }
}
