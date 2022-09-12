import HttpRequest from 'shared/src/main/domain/http/HttpRequest'
import HttpResponse from 'shared/src/main/domain/http/HttpResponse'

interface StudentApi {
  create: (request: HttpRequest) => Promise<HttpResponse>
  find: (studentId: string) => Promise<HttpResponse>
}

export default StudentApi
