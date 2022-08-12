import { Entity } from '@/components/Entity'
import Movement from '@/components/Movement'
import { Direction, Sprite } from '@/components/types'
import LizardAnimation from '@/npcs/lizard/components/LizardAnimation'
import PatrolAI from '@/npcs/lizard/components/PatrolAI'
import Phaser from 'phaser'

export default class Lizard extends Entity<Sprite> {
  constructor(group: Phaser.Physics.Arcade.Group, x: number, y: number) {
    super(group.get(x, y, 'lizard'), 'lizard')
    this.movement.direction = Direction.DOWN
    this.engine.body.setSize(16, 16)
    this.engine.body.setOffset(0, 8)
    this.addComponent(new Movement(this))
    this.addComponent(new LizardAnimation(this))
    this.addComponent(new PatrolAI(this))
  }
}
