import Student from './Student'

interface StudentRepository {
  addStudent: (student: Student) => Promise<void>
  findStudent: (studentId: string) => Promise<Student>
}

export default StudentRepository
