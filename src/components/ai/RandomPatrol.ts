import { EntityComponent } from '@/components/Component'
import { Entity } from '@/components/Entity'
import { Sprite } from '@/components/types'

export default class RandomPatrol extends EntityComponent<Sprite> {
  constructor(e: Entity<Sprite>) {
    super(e)
  }
}
