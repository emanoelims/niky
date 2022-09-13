import GymClassRepository from '../domain/GymClassRepository'
import StudentMonitorService from '../domain/service/StudentMonitorService'

interface AddStudentMonitorInput {
  gymClassId: string
  studentId: string
}

class AddStudentMonitor {
  constructor(private readonly gymClassRepository: GymClassRepository) {}

  public async execute(input: AddStudentMonitorInput): Promise<void> {
    const { gymClassId, studentId } = input
    const gymClass = await this.gymClassRepository.findGymClass(gymClassId)
    await gymClass.changeStudentMonitor(
      studentId,
      new StudentMonitorService(this.gymClassRepository)
    )
    await this.gymClassRepository.updateGymClass(gymClassId, gymClass)
  }
}

export default AddStudentMonitor
