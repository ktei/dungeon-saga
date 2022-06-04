import { EntityComponent } from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Direction, Sprite } from '@/components/types'
import { emitter } from '@/events/bus'

export default class PatrolAI extends EntityComponent<Sprite> {
  private moveEvent: Phaser.Time.TimerEvent
  private messageEvent: Phaser.Time.TimerEvent

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

    this.messageEvent = this.entity.engine.scene.time.addEvent({
      delay: 200,
      callback: this.sendCoordinate,
      loop: true
    })
  }

  private sendCoordinate = () => {
    const { engine } = this.entity
    emitter.emit('message', { x: engine.x, y: engine.y })
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
    this.messageEvent.destroy()
  }
}
