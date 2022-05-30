import Phaser from 'phaser'
import AnimKeys from './AnimKeys'

export const createCharacterAnims = (
  anims: Phaser.Animations.AnimationManager
) => {
  anims.create({
    key: AnimKeys.Faune.IdleDown,
    frames: [
      {
        key: 'faune',
        frame: 'faune/walk-down/walk-down-3.png'
      }
    ]
  })

  anims.create({
    key: AnimKeys.Faune.IdleUp,
    frames: [
      {
        key: 'faune',
        frame: 'faune/walk-up/walk-up-3.png'
      }
    ]
  })

  anims.create({
    key: AnimKeys.Faune.IdleSide,
    frames: [
      {
        key: 'faune',
        frame: 'faune/walk-side/walk-side-3.png'
      }
    ]
  })

  anims.create({
    key: AnimKeys.Faune.RunDown,
    frames: anims.generateFrameNames('faune', {
      start: 1,
      end: 8,
      prefix: 'faune/run-down/run-down-',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 15
  })

  anims.create({
    key: AnimKeys.Faune.RunUp,
    frames: anims.generateFrameNames('faune', {
      start: 1,
      end: 8,
      prefix: 'faune/run-up/run-up-',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 15
  })

  anims.create({
    key: AnimKeys.Faune.RunSide,
    frames: anims.generateFrameNames('faune', {
      start: 1,
      end: 8,
      prefix: 'faune/run-side/run-side-',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 15
  })

  anims.create({
    key: AnimKeys.Faune.Faint,
    frames: anims.generateFrameNames('faune', {
      start: 1,
      end: 4,
      prefix: 'faune/faint/faint-',
      suffix: '.png'
    }),
    frameRate: 15
  })
}
