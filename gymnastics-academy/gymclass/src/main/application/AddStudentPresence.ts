import GymClassRepository from '../domain/GymClassRepository'

interface AddStudentPresenceInput {
  gymClassId: string
  date: Date
  studentId: string
  isPresent: boolean
}

class AddStudentPresence {
  constructor(private readonly gymClassRepository: GymClassRepository) {}

  public async execute(input: AddStudentPresenceInput): Promise<void> {
    const { gymClassId, date, studentId, isPresent } = input
    const gymClass = await this.gymClassRepository.findGymClass(gymClassId)
    gymClass.addStudentPresence(date, studentId, isPresent)
  }
}

export default AddStudentPresence
