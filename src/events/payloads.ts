import { EntityName, GameObjectName } from '@/components/names'
import { Direction } from '@/components/types'

export type GameData = Array<EntityData>

export type EntityData = {
  id: number
  name: EntityName
  x: number
  y: number
  direction: Direction
  state?: {
    hitPoints: number
  }
  collision?: {
    collidedWith: GameObjectName
    id?: number
    x: number
    y: number
  }
}

export type ArcadeGroupAddedEvent = {
  name: string
  group: Phaser.Physics.Arcade.Group
}
