import HttpRequest from 'shared/src/main/domain/http/HttpRequest'
import HttpResponse from 'shared/src/main/domain/http/HttpResponse'

interface InstructorApi {
  create: (request: HttpRequest) => Promise<HttpResponse>
  find: (instructorId: string) => Promise<HttpResponse>
}

export default InstructorApi
