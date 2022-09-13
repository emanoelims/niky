import GymClass from './entity/GymClass'

interface GymClassRepository {
  createGymClass: (gymClass: GymClass) => Promise<void>
  findGymClasses: (active?: boolean) => Promise<GymClass[]>
  findGymClass: (gymClassId: string) => Promise<GymClass>
  updateGymClass: (gymClassId: string, newGymClass: GymClass) => Promise<void>
  enrollStudent: (date: Date, gymClassId: string, studentId: string) => Promise<void>
  studentsEnrolled: (gymClassId: string) => Promise<string[]>
  makeCallStudent: (
    date: Date,
    gymClassId: string,
    studentId: string,
    present: boolean
  ) => Promise<void>
}

export default GymClassRepository
