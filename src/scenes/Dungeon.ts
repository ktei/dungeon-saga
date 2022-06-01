import Phaser from 'phaser'
import Faune from '@/characters/faune/Faune'
import '@/characters/faune/Faune'
import { createAnims } from '@/anims/animsFactory'
import Lizard from '@/npcs/lizard/Lizard'
import GameScene from '@/scenes/GameScene'

export default class Dungeon extends GameScene {
  private faune!: Faune

  constructor() {
    super('dungeon')
  }

  create() {
    createAnims(this.anims)

    const map = this.make.tilemap({ key: 'dungeon' })
    const tileset = map.addTilesetImage('dungeon', 'tiles', 16, 16)

    map.createLayer('Ground', tileset)
    const wallsLayer = map.createLayer('Walls', tileset)
    wallsLayer.setCollisionByProperty({ collides: true })

    this.addEntities((this.faune = new Faune(this, 128, 128)))

    // put some lizards
    const lizardsGroup = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      createCallback: g => {
        const lizard = g as Phaser.Physics.Arcade.Sprite
        lizard.body.onCollide = true
      }
    })

    this.addEntities(
      new Lizard(lizardsGroup, 256, 256),
      new Lizard(lizardsGroup, 450, 312)
    )

    this.cameras.main.startFollow(
      this.faune.engine,
      true,
      undefined,
      undefined,
      -100,
      -150
    )

    this.physics.add.collider(this.faune.engine, wallsLayer)
    this.physics.add.collider(lizardsGroup, wallsLayer)
    this.physics.add.collider(
      lizardsGroup,
      this.faune.engine,
      undefined,
      undefined,
      this
    )
  }
}
