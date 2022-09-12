import GymClass from './entity/GymClass'

interface GymClassRepository {
  createGymClass: (gymClass: GymClass) => Promise<void>
  findGymClasses: (active?: boolean) => Promise<GymClass[]>
  findGymClass: (gymClassId: string) => Promise<GymClass>
  updateGymClass: (newGymClass: GymClass) => Promise<void>
}

export default GymClassRepository
