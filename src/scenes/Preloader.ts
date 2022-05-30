import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload(): void {
    this.load.image('tiles', 'tiles/dungeon.png')
    this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon2.json')

    this.load.atlas('faune', 'characters/faune.png', 'characters/faune.json')
    this.load.atlas('lizard', 'npcs/lizard.png', 'npcs/lizard.json')
  }

  create(): void {
    this.scene.start('dungeon')
  }
}
