import Input from '@/components/Input'
import Movement from '@/components/Movement'
import { GameObject } from '@/components/GameObjects'
import Player from '@/components/Player'
import { Direction, Sprite } from '@/components/types'
import FauneAnimation from '@/characters/faune/components/FauneAnimation'

export default class Faune extends GameObject<Sprite> {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene.physics.add.sprite(x, y, 'faune', undefined))
    this.movement.direction = Direction.DOWN
    this.engine.body.setSize(16, 16)
    this.addComponent(new Input(this))
    this.addComponent(new Player(this))
    this.addComponent(new Movement(this))
    this.addComponent(new FauneAnimation(this))
  }
}
