import Component from '@/components/Component'
import { getNextId } from '@/components/helpers'
import {
  Direction,
  Movement,
  PlayerInput,
  GameObject
} from '@/components/types'
import { FAKE_CLIENT_ID } from '@/constants/client'

export type Metadata = {
  id: number
  name?: string
}

export abstract class Entity<T extends GameObject> implements Component {
  public movement: Movement
  public input?: PlayerInput
  private components: Component[]
  private metadata: Metadata

  constructor(public engine: T, metadata?: Omit<Metadata, 'id'>) {
    this.movement = {
      speed: 0,
      direction: Direction.NONE
    }
    this.components = []
    this.metadata = {
      id: getNextId(FAKE_CLIENT_ID),
      ...metadata
    }
  }

  public get id(): number {
    return this.metadata.id
  }

  public get name(): string | undefined {
    return this.metadata.name
  }

  public update(time: number, delta: number): void {
    this.components.forEach(x => x.update(time, delta))
  }

  protected addComponent(component: Component): void {
    this.components.push(component)
  }
}
