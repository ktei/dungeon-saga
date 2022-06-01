import { Entity } from '@/components/Entity'
import { GameObject } from '@/components/types'
import Phaser from 'phaser'

export default abstract class GameScene extends Phaser.Scene {
  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config)
  }

  private entities = new Map<number, Entity<GameObject>>()
  private entitiesByName = new Map<string, Entity<GameObject>[]>()

  protected addEntities(...entities: Entity<GameObject>[]): void {
    entities.forEach(e => {
      this.entities.set(e.id, e)
      if (e.name) {
        const group = this.entitiesByName.get(e.name)
        if (group) {
          group.push(e)
        } else {
          this.entitiesByName.set(e.name, [e])
        }
      }
    })
  }

  protected findEntityById(id: number): Entity<GameObject> | undefined {
    return this.entities.get(id)
  }

  protected findEntitiesByName(name: string): Entity<GameObject>[] {
    return this.entitiesByName.get(name) ?? []
  }

  update(time: number, delta: number): void {
    this.entities.forEach(e => e.update(time, delta))
  }
}
