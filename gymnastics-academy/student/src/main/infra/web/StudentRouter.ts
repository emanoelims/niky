import Http from 'shared/src/main/domain/http/Http'
import StudentController from './controller/StudentController'

export default class StudentRouter {
  constructor(private readonly http: Http, studentController: StudentController) {
    http.on('post', '/students', async (request) => {
      return await studentController.create(request)
    })
    http.on('get', '/students/:id', async (request) => {
      return await studentController.find(request.params.id)
    })
  }

  static of(http: Http, controller: StudentController): StudentRouter {
    return new StudentRouter(http, controller)
  }
}
