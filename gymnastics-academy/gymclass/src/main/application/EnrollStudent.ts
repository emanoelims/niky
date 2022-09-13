import GymClassRepository from '../domain/GymClassRepository'
import StudentIsAlreadyEnrolled from '@gymclass/domain/errors/StudentIsAlreadyEnrolled'

interface EnrollStudentInput {
  date: Date
  gymClassId: string
  studentId: string
}

class EnrollStudent {
  constructor(private readonly gymClassRepository: GymClassRepository) {}

  public async execute(input: EnrollStudentInput): Promise<void> {
    const { gymClassId, studentId } = input
    const studentsEnrolled = await this.gymClassRepository.studentsEnrolled(gymClassId)
    const isExists = studentsEnrolled.some((e) => e === studentId)
    if (isExists) throw new StudentIsAlreadyEnrolled()
    await this.gymClassRepository.enrollStudent(new Date(), gymClassId, studentId)
  }
}

export default EnrollStudent
