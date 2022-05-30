import Dungeon from '@/scenes/Dungeon'
import Phaser from 'phaser'
import Preloader from '@/scenes/Preloader'

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  },
  scene: [Preloader, Dungeon],
  scale: {
    zoom: 1.5
  }
}

export default new Phaser.Game(config)
