import Phaser from 'phaser'
import { createCharacterAnims } from '@/anims/CharacterAnims'
import { createNpcAnims } from '@/anims/NpcAnims'

export const createAnims = (anims: Phaser.Animations.AnimationManager) => {
  createCharacterAnims(anims)
  createNpcAnims(anims)
}
