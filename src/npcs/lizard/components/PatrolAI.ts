import { EntityComponent } from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Coordinate, Sprite } from '@/components/types'
import { Math } from 'phaser'

/**
 * This component controls how NPCs patrol. Upon receiving the data
 * from server, we alternate the NPC's direction based on the data.
 */
export default class PatrolAI extends EntityComponent<Sprite> {
  // private moveEvent: Phaser.Time.TimerEvent

  // Record the coordinate where collision occurs
  private collidedCoord?: Coordinate

  constructor(e: Entity<Sprite>) {
    super(e)

    this.entity.movement.speed = 100

    this.entity.engine.scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleTileCollision
    )

    // this.moveEvent = this.entity.engine.scene.time.addEvent({
    //   delay: Phaser.Math.Between(1500, 4000),
    //   callback: this.changeDirection,
    //   loop: true
    // })
  }

  private handleTileCollision = (
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.Tilemaps.Tile
  ) => {
    if (obj1 !== this.entity.engine) {
      return
    }
    this.collidedCoord = { x: this.entity.engine.x, y: this.entity.engine.y }

    // Mark the entity collided with tile; this will give
    // server the decision making knowledge when choosing a different
    // direction upon collision
    this.entity.movement.collision = {
      collidedWith: 'wall',
      coord: {
        x: obj2.x,
        y: obj2.y
      }
    }
  }

  public update(): void {
    if (this.collidedCoord) {
      // calculate the distance between the coordinate of last
      // collided position and current position
      const distance = Math.Distance.Between(
        this.entity.engine.x,
        this.entity.engine.y,
        this.collidedCoord.x,
        this.collidedCoord.y
      )

      // if there distance is greater than 0, it means
      // the object has left the originally collided position
      // meaning it no longer collides

      // this is not the most accurate way to detect collision,
      // but Phaser doesn't give me an easy collision exit
      // callback so right now this is all that I have
      if (distance === 0) {
        this.entity.movement.collision = undefined
      }
    }
    // if (this.collidedTile) {
    //   const stillCollided = this.entity.engine.scene.physics.overlapTiles(
    //     this.entity.engine,
    //     [this.collidedTile]
    //   )
    //   console.log(stillCollided)
    // }
  }

  // public update(): void {
  //   if (this.entity.movement.isCollided) {
  //     this.entity.engine.scene.physics.collideTiles()
  //   }
  // }

  // private changeDirection = () => {
  //   this.entity.movement.direction = this.getNextRandomDirection()
  // }

  // private getNextRandomDirection = () => {
  //   const directions = [
  //     Direction.UP,
  //     Direction.RIGHT,
  //     Direction.DOWN,
  //     Direction.LEFT
  //   ].filter(v => v != this.entity.movement.direction)
  //   const idx = Phaser.Math.Between(0, 2)
  //   return directions[idx]
  // }

  public destroy(): void {
    super.destroy()
    // this.moveEvent.destroy()
  }
}
