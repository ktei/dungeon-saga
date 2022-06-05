import { Direction } from '@/components/types'

export type GameObjectState = {
  coord: Record<'x' | 'y', number>
  direction: Direction
}

export type GameData = Record<number, GameObjectState>
