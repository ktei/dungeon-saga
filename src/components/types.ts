import { GameObjectName } from '@/components/names'

export type Sprite = Phaser.Physics.Arcade.Sprite
export type Image = Phaser.Physics.Arcade.Image
export type GameObject = Sprite | Image

export enum Direction {
  // eslint-disable-next-line no-unused-vars
  UP,
  // eslint-disable-next-line no-unused-vars
  RIGHT,
  // eslint-disable-next-line no-unused-vars
  DOWN,
  // eslint-disable-next-line no-unused-vars
  LEFT
}

export interface Movement {
  speed: number
  direction: Direction
  collision?: {
    collidedWith: GameObjectName
    id?: number
    coord: Coordinate
  }
}

export interface PlayerInput {
  direction: Direction
}

export type Coordinate = {
  x: number
  y: number
}
