import { Entity } from '@/components/Entity'
import { GameObject, World } from '@/components/types'
import Dungeon from '@/scenes/Dungeon'

export default interface Component {
  update(_time: number, _delta: number): void
  destroy(_fromScene?: boolean): void
}

export abstract class EntityComponent<T extends GameObject>
  implements Component
{
  constructor(private _entity: Entity<T>) {}

  protected get entity(): Entity<T> {
    return this._entity
  }

  protected get world(): World {
    return this._entity.engine.scene as Dungeon as World
  }

  public update(): void {
    return
  }

  public destroy(): void {
    return
  }
}
