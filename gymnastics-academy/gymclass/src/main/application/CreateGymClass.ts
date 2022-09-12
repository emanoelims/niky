import GymClass from '../domain/entity/GymClass'
import Lesson from '../domain/valueobject/Lesson'
import Activity from '../domain/valueobject/Activity'

import GymClassRepository from '../domain/GymClassRepository'

interface LessonInput {
  startTime: string
  duration: string
}

interface CreateGymClassInput {
  maximumStudents: number
  startDate: Date
  endDate: Date
  lesson: LessonInput
  activity: string
  instructorId: string
}

interface CreateGymClassOutput {
  id: string
}

class CreateGymClass {
  constructor(private readonly gymClassRepository: GymClassRepository) {}

  public async execute(input: CreateGymClassInput): Promise<CreateGymClassOutput> {
    const { maximumStudents, startDate, endDate, lesson, activity, instructorId } = input
    const gymClass = new GymClass({
      maximumStudents,
      startDate,
      endDate,
      lesson: Lesson.of(new Date(lesson.startTime), new Date(lesson.duration)),
      activity: Activity.valueOf(activity),
      instructorId,
    })
    await this.gymClassRepository.createGymClass(gymClass)
    return { id: gymClass.id }
  }
}

export default CreateGymClass
