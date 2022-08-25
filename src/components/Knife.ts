import { EntityComponent } from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Direction, GameObject, KnifeState } from '@/components/types'
import { ARCADE_GROUP_ADDED } from '@/events/constants'
import { emitter } from '@/events/hub'

export default class Knife extends EntityComponent<GameObject> {
  private _knives!: Phaser.Physics.Arcade.Group
  private isThrowing = false

  constructor(e: Entity<GameObject>, numberOfKnives = 3) {
    super(e)
    e.registerState<KnifeState>('knife', {
      canThrow: false,
      numberOfKnives
    })

    this._knives = this.entity.engine.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 1
    })

    emitter.emit(ARCADE_GROUP_ADDED, {
      name: 'knives',
      group: this._knives
    })

    this.entity.engine.scene.physics.add.collider(
      this._knives,
      this.world.wallsLayer,
      this.handleKnifeWallCollision,
      undefined,
      this
    )
  }

  private handleKnifeWallCollision = (obj1: Phaser.GameObjects.GameObject) => {
    this._knives.killAndHide(obj1)
  }

  public update(): void {
    if (!this.entity.engine) return
    if (this.isThrowing) return

    const state = this.entity.getState<KnifeState>('knife')
    if (state.canThrow && state.numberOfKnives > 0) {
      this.isThrowing = true
      this.throwKnife()
      this.entity.updateState<KnifeState>('knife', state => ({
        ...state,
        canThrow: false
      }))
      this.isThrowing = false
    }
  }

  private throwKnife = () => {
    const direction = this.entity.movement.direction
    const vec = new Phaser.Math.Vector2(0, 0)
    switch (direction) {
      case Direction.UP:
        vec.y = -1
        break
      case Direction.DOWN:
        vec.y = 1
        break
      case Direction.LEFT:
        vec.x = -1
        break
      case Direction.RIGHT:
        vec.x = 1
        break
    }

    const angle = vec.angle()
    const knife = this._knives.get(
      this.entity.engine.x,
      this.entity.engine.y,
      'knife'
    ) as Phaser.Physics.Arcade.Image

    if (!knife) {
      return
    }
    knife.setActive(true)
    knife.setVisible(true)
    knife.setRotation(angle)
    knife.x += vec.x * 16
    knife.y += vec.y * 16
    knife.setVelocity(vec.x * 300, vec.y * 300)
    this.entity.updateState<KnifeState>('knife', state => ({
      ...state,
      numberOfKnives: state.numberOfKnives - 1
    }))
  }
}
