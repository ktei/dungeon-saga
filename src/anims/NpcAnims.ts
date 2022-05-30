import AnimKeys from '@/anims/AnimKeys'
import Phaser from 'phaser'

export const createNpcAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: AnimKeys.Lizard.Idle,
    frames: anims.generateFrameNames('lizard', {
      start: 0,
      end: 3,
      prefix: 'lizard_m_idle_anim_f',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 10
  })

  anims.create({
    key: AnimKeys.Lizard.Run,
    frames: anims.generateFrameNames('lizard', {
      start: 0,
      end: 3,
      prefix: 'lizard_m_run_anim_f',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 10
  })
}
