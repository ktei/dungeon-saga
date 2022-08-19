import { GameObjectName } from '@/components/names'

export type Sprite = Phaser.Physics.Arcade.Sprite
export type Image = Phaser.Physics.Arcade.Image
export type GameObject = Sprite | Image

export interface World {
  get wallsLayer(): Phaser.Tilemaps.TilemapLayer
}

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

export type Movement = {
  speed: number
  direction: Direction
  collision?: {
    collidedWith: GameObjectName
    id?: number
    coord: Coordinate
  }
}

export type PlayerInput = {
  direction?: Direction
  spaceDown?: boolean
}

export type Coordinate = {
  x: number
  y: number
}

export type KnifeState = {
  canThrow: boolean
  numberOfKnives: number
}
