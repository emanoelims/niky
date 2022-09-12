import GymClassRepository from '../domain/GymClassRepository'

interface GetStudentPresencesInput {
  date: Date
  studentId: string
  gymClassId: string
}

interface GetStudentPresencesOutput {
  studentId: string
  present: boolean
}

class GetStudentPresences {
  constructor(private readonly gymClassRepository: GymClassRepository) {}

  async execute(input: GetStudentPresencesInput): Promise<GetStudentPresencesOutput[]> {
    const { date, gymClassId, studentId } = input
    const gymClass = await this.gymClassRepository.findGymClass(gymClassId)
    return gymClass.classRecordBook.find(date, studentId)
  }
}

export default GetStudentPresences
