import GymClassRepository from '../GymClassRepository'

class StudentMonitorService {
  constructor(private readonly gymClassRepository: GymClassRepository) {}

  public async apply(studentId: string): Promise<boolean> {
    return (await this.gymClassRepository.findGymClasses()).some(
      (gymClass) => gymClass.studentMonitorId === studentId
    )
  }
}

export default StudentMonitorService
