import { randomUUID } from 'crypto'

abstract class Entity {
  private readonly _id: string

  protected constructor(id: string = randomUUID()) {
    this._id = id
  }

  get id(): string {
    return this._id
  }

  public equals(otherId: string): boolean {
    return Object.is(this._id, otherId)
  }
}

export default Entity
