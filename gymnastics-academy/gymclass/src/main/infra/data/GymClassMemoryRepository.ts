import GymClass from 'gymclass/src/main/domain/entity/GymClass'
import GymClassRepository from 'gymclass/src/main/domain/GymClassRepository'

export default class GymClassMemoryRepository implements GymClassRepository {
  private _gymClasses: GymClass[] = []

  public async createGymClass(gymClass: GymClass): Promise<void> {
    this._gymClasses.push(gymClass)
  }

  public async findGymClass(gymClassId: string): Promise<GymClass> {
    const gymClass = this._gymClasses.find((gymClass) => gymClass.id === gymClassId)
    if (gymClass === undefined) throw new Error('gymClass not found')
    return gymClass
  }

  public async findGymClasses(active: boolean | undefined): Promise<GymClass[]> {
    return this._gymClasses
  }

  public async updateGymClass(newGymClass: GymClass): Promise<void> {
    this._gymClasses = this._gymClasses.filter((gymClass) => gymClass.id !== newGymClass.id)
    this._gymClasses.push(newGymClass)
  }
}
