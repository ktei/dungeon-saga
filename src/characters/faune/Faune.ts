import FauneAnimation from '@/characters/faune/components/FauneAnimation'
import { Entity } from '@/components/Entity'
import Input from '@/components/Input'
import Movement from '@/components/Movement'
import Player from '@/components/Player'
import { Direction, Sprite } from '@/components/types'

export default class Faune extends Entity<Sprite> {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene.physics.add.sprite(x, y, 'faune', undefined), 'hero')
    this.movement.direction = Direction.DOWN
    this.engine.body.setSize(16, 16)
    this.addComponent(new Input(this))
    this.addComponent(new Player(this))
    this.addComponent(new Movement(this))
    this.addComponent(new FauneAnimation(this))
  }
}
