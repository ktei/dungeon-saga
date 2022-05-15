import Phaser from 'phaser'
import { createCharacterAnims } from '@root/anims/CharacterAnims'
import Faune from '@root/characters/Faune'
import '@root/characters/Faune'

export default class Dungeon extends Phaser.Scene {
  private faune!: Faune

  constructor() {
    super('dungeon')
  }

  create() {
    this.createAnims()

    const map = this.make.tilemap({ key: 'dungeon' })
    const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16)

    map.createLayer('Ground', tileset)
    const wallsLayer = map.createLayer('Walls', tileset)
    wallsLayer.setCollisionByProperty({ collides: true })

    this.faune = new Faune(this, 128, 128)

    this.cameras.main.startFollow(
      this.faune.engine,
      true,
      undefined,
      undefined,
      -100,
      -150
    )

    this.physics.add.collider(this.faune.engine, wallsLayer)
  }

  update(time: number, delta: number): void {
    this.faune.update(time, delta)
  }

  private createAnims(): void {
    createCharacterAnims(this.anims)
  }
}
