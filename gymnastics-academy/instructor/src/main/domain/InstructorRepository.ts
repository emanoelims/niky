import Instructor from './Instructor'

interface InstructorRepository {
  createInstructor: (instructor: Instructor) => Promise<void>
  findInstructor: (instructorId: string) => Promise<Instructor>
}

export default InstructorRepository
