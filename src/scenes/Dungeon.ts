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

    this.faune = this.add.faune(128, 128, 'faune')

    this.cameras.main.startFollow(
      this.faune,
      true,
      undefined,
      undefined,
      -100,
      -150
    )
  }

  update(): void {
    this.faune.update()
  }

  private createAnims(): void {
    createCharacterAnims(this.anims)
  }
}
