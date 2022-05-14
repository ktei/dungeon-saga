import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader')
  }

  preload(): void {
    this.load.image('tiles', 'tiles/dungeon.png')
    this.load.tilemapTiledJSON('dungeon', 'tiles/dungeon.json')

    this.load.atlas('faune', 'characters/faune.png', 'characters/faune.json')
    this.load.atlas('door', 'items/door.png', 'items/door.json')
  }

  create(): void {
    this.scene.start('dungeon')
  }
}
