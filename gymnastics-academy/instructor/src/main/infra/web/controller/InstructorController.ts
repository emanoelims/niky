import InstructorApi from '../InstructorApi'
import InstructorRepository from '../../../domain/InstructorRepository'
import HttpRequest from 'shared/src/main/domain/http/HttpRequest'
import HttpResponse from 'shared/src/main/domain/http/HttpResponse'

import GetInstructor from 'instructor/src/main/application/GetInstructor'
import CreateInstructor from 'instructor/src/main/application/CreateInstructor'

class InstructorController implements InstructorApi {
  constructor(private readonly instructorRepository: InstructorRepository) {}

  public async create(request: HttpRequest): Promise<HttpResponse> {
    const { document, name, birthDate, phoneNumbers, academicDegree } = request.body
    const createInstructor = new CreateInstructor(this.instructorRepository)
    const output = await createInstructor.execute({
      document,
      name,
      birthDate: new Date(birthDate),
      phoneNumbers,
      academicDegree,
    })
    return { statusCode: 201, body: output }
  }

  public async find(instructorId: string): Promise<HttpResponse> {
    const getInstructor = new GetInstructor(this.instructorRepository)
    try {
      const instructor = await getInstructor.execute({ instructorId })
      return { statusCode: 200, body: instructor }
    } catch (e) {
      return { statusCode: 404 }
    }
  }
}

export default InstructorController
