import { EntityComponent } from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Direction, GameObject, KnifeState } from '@/components/types'

export default class Knife extends EntityComponent<GameObject> {
  private _knives!: Phaser.Physics.Arcade.Group

  constructor(e: Entity<GameObject>, numberOfKnives = 3) {
    super(e)
    e.setState<KnifeState>('knife', {
      shouldThrow: false,
      numberOfKnives
    })

    this._knives = this.entity.engine.scene.physics.add.group({
      classType: Phaser.Physics.Arcade.Image,
      maxSize: 1
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

    const state = this.entity.getState<KnifeState>('knife')
    if (state.shouldThrow && state.numberOfKnives > 0) {
      this.throwKnife()
      this.entity.setState<KnifeState>('knife', {
        shouldThrow: false,
        numberOfKnives: state.numberOfKnives - 1
      })
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
    console.log(angle)
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
  }
}
