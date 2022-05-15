export type Sprite = Phaser.Physics.Arcade.Sprite
export type Image = Phaser.Physics.Arcade.Image

export enum Direction {
  NONE = -1,
  UP,
  RIGHT,
  DOWN,
  LEFT
}

export interface Movement {
  speed: number
  direction: Direction
}

export interface PlayerInput {
  direction: Direction
}
