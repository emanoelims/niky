import Http from 'shared/src/main/domain/http/Http'
import InstructorController from './controller/InstructorController'

export default class InstructorRouter {
  constructor(private readonly http: Http, instructorController: InstructorController) {
    http.on('post', '/instructors', async (request) => {
      return await instructorController.create(request)
    })
    http.on('get', '/instructors/:id', async (request) => {
      return await instructorController.find(request.params.id)
    })
  }

  static of(http: Http, controller: InstructorController): InstructorRouter {
    return new InstructorRouter(http, controller)
  }
}
