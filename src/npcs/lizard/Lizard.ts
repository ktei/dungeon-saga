import Phaser from 'phaser'
import { GameObject } from '@/components/GameObjects'
import { Direction, Sprite } from '@/components/types'
import Movement from '@/components/Movement'
import LizardAnimation from '@/npcs/lizard/components/LizardAnimation'

export default class Faune extends GameObject<Sprite> {
  constructor(group: Phaser.Physics.Arcade.Group, x: number, y: number) {
    super(group.get(x, y, 'lizard'))
    this.movement.direction = Direction.DOWN
    this.engine.body.setSize(16, 16)
    this.engine.body.setOffset(0, 8)
    this.addComponent(new Movement(this))
    this.addComponent(new LizardAnimation(this))
  }
}
