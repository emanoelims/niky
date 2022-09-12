import GymClassRepository from '../domain/GymClassRepository'

interface GetAllGymClassesOutput {
  id: string
  instructorId: string
  studentMonitorId: string
  activity: string
}

class GetAllGymClasses {
  constructor(private readonly gymClassRepository: GymClassRepository) {}

  public async execute(): Promise<GetAllGymClassesOutput[]> {
    const gymClasses = await this.gymClassRepository.findGymClasses(true)
    return gymClasses.map((gymClass) => {
      return {
        id: gymClass.id,
        instructorId: gymClass.instructorId,
        studentMonitorId: gymClass.studentMonitorId ?? '',
        activity: gymClass.activity.name,
      }
    })
  }
}

export default GetAllGymClasses
