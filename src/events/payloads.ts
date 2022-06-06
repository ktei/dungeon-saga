import { Direction } from '@/components/types'

export type GameObjectState = {
  coord: Record<'x' | 'y', number>
  direction: Direction
  is_collided: boolean
}

export type GameData = Record<number, GameObjectState>
