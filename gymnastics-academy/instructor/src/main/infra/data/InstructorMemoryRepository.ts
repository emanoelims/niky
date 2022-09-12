import Instructor from 'instructor/src/main/domain/Instructor'
import InstructorRepository from 'instructor/src/main/domain/InstructorRepository'

export default class InstructorMemoryRepository implements InstructorRepository {
  private readonly _instructors: Instructor[] = []

  public async createInstructor(instructor: Instructor): Promise<void> {
    this._instructors.push(instructor)
  }

  public async findInstructor(instructorId: string): Promise<Instructor> {
    const instructor = this._instructors.find((instructor) => instructor.id === instructorId)
    if (instructor === undefined) throw new Error('instructor not found')
    return instructor
  }
}
