import { EntityComponent } from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Direction, Sprite } from '@/components/types'

export default class PatrolAI extends EntityComponent<Sprite> {
  private moveEvent: Phaser.Time.TimerEvent

  constructor(e: Entity<Sprite>) {
    super(e)

    this.entity.movement.speed = 100

    this.entity.engine.scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleTileCollision
    )

    this.moveEvent = this.entity.engine.scene.time.addEvent({
      delay: Phaser.Math.Between(1500, 4000),
      callback: this.changeDirection,
      loop: true
    })
  }

  private handleTileCollision = (gameObject: Phaser.GameObjects.GameObject) => {
    if (gameObject !== this.entity.engine) {
      return
    }

    this.changeDirection()
  }

  private changeDirection = () => {
    this.entity.movement.direction = this.getNextRandomDirection()
  }

  private getNextRandomDirection = () => {
    const directions = [
      Direction.UP,
      Direction.RIGHT,
      Direction.DOWN,
      Direction.LEFT
    ].filter(v => v != this.entity.movement.direction)
    const idx = Phaser.Math.Between(0, 2)
    return directions[idx]
  }

  public destroy(): void {
    super.destroy()
    this.moveEvent.destroy()
  }
}
