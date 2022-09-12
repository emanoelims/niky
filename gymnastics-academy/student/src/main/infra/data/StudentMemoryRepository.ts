import Student from 'student/src/main/domain/Student'
import StudentRepository from 'student/src/main/domain/StudentRepository'

export default class StudentMemoryRepository implements StudentRepository {
  private readonly _students: Student[] = []

  public async addStudent(student: Student): Promise<void> {
    this._students.push(student)
  }

  public async findStudent(studentId: string): Promise<Student> {
    const student = this._students.find((student) => student.id === studentId)
    if (student === undefined) throw Error('student not found')
    return student
  }
}
