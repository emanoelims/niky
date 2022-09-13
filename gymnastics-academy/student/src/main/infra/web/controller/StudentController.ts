import HttpRequest from 'shared/src/main/domain/http/HttpRequest'
import HttpResponse from 'shared/src/main/domain/http/HttpResponse'

import GetStudent from 'student/src/main/application/GetStudent'
import CreateStudent from 'student/src/main/application/CreateStudent'
import StudentRepository from 'student/src/main/domain/StudentRepository'

import StudentApi from '../StudentApi'

class StudentController implements StudentApi {
  constructor(private readonly studentRepository: StudentRepository) {}

  public async create(request: HttpRequest): Promise<HttpResponse> {
    const { name, enrollStudent, birthDate, height, weight, phoneNumber, address } = request.body
    const createStudent = new CreateStudent(this.studentRepository)
    const output = await createStudent.execute({
      name,
      enrollStudent,
      birthDate: new Date(birthDate),
      height: parseInt(height),
      weight: parseFloat(weight),
      phoneNumber,
      address,
    })
    return { statusCode: 201, body: output }
  }

  public async find(studentId: string): Promise<HttpResponse> {
    const getStudent = new GetStudent(this.studentRepository)
    try {
      const student = await getStudent.execute({ studentId })
      return { statusCode: 200, body: student }
    } catch (e) {
      return { statusCode: 404 }
    }
  }
}

export default StudentController
