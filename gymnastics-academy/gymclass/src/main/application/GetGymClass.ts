import GymClassRepository from '../domain/GymClassRepository'

interface GetGymClassInput {
  gymClassId: string
}

interface GetGymClassOutput {
  id: string
  instructorId: string
  studentMonitorId: string
  activity: string
  lessonTimeStart: Date
  lessonDuration: Date
  studentsId: string[]
}

class GetGymClass {
  constructor(private readonly gymClassRepository: GymClassRepository) {}

  public async execute({ gymClassId }: GetGymClassInput): Promise<GetGymClassOutput> {
    const gymClass = await this.gymClassRepository.findGymClass(gymClassId)
    return {
      id: gymClass.id,
      instructorId: gymClass.instructorId,
      studentMonitorId: gymClass.studentMonitorId ?? '',
      activity: gymClass.activity.name,
      lessonTimeStart: gymClass.lesson.startTime,
      lessonDuration: gymClass.lesson.duration,
      studentsId: gymClass.studentsId,
    }
  }
}

export default GetGymClass
