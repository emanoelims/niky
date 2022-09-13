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
    await this.gymClassRepository.makeCallStudent(date, gymClassId, studentId, isPresent)
  }
}

export default AddStudentPresence
