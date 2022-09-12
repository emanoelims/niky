import GymClassRepository from '../domain/GymClassRepository'

interface EnrollStudentInput {
  gymClassId: string
  studentId: string
}

class EnrollStudent {
  constructor(private readonly gymClassRepository: GymClassRepository) {}

  public async execute(input: EnrollStudentInput): Promise<void> {
    const { gymClassId, studentId } = input
    const gymClass = await this.gymClassRepository.findGymClass(gymClassId)
    gymClass.enrollStudent(studentId)
    await this.gymClassRepository.updateGymClass(gymClass)
  }
}

export default EnrollStudent
