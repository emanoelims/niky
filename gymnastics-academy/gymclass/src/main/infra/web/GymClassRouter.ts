import Http from 'shared/src/main/domain/http/Http'
import GymClassController from './controller/GymClassController'

export default class GymClassRouter {
  constructor(private readonly http: Http, gymClassController: GymClassController) {
    http.on('post', '/gymclasses', async (request) => {
      return await gymClassController.create(request)
    })
    http.on('get', '/gymclasses', async (request) => {
      return await gymClassController.list(request)
    })
    http.on('get', '/gymclasses/:id', async (request) => {
      return await gymClassController.findGymClass(request.params.id)
    })
    http.on('post', '/gymclasses/:gymClassId/enroll', async (request) => {
      const { gymClassId } = request.params
      const { student_id: studentId } = request.body
      return await gymClassController.enrollStudent(gymClassId, studentId)
    })
    http.on('post', '/gymclasses/:gymClassId/activate', async (request) => {
      const { gymClassId } = request.params
      return await gymClassController.activateGymClass(gymClassId)
    })
    http.on('post', '/gymclasses/:gymClassId/addmonitor', async (request) => {
      const { gymClassId } = request.params
      const { student_id: studentId } = request.body
      return await gymClassController.addStudentMonitor(gymClassId, studentId)
    })
    http.on('post', '/gymclasses/:gymClassId/recordbook', async (request) => {
      const { gymClassId } = request.params
      const { date, student_id: studentId, present } = request.body
      return await gymClassController.addStudentPresence(date, gymClassId, studentId, present)
    })
    http.on('get', '/gymclasses/:gymClassId/recordbook/:studentId/date/:date', async (request) => {
      const { date, gymClassId, studentId } = request.params
      return await gymClassController.getStudentPresences(date, gymClassId, studentId)
    })
  }

  static of(http: Http, controller: GymClassController): GymClassRouter {
    return new GymClassRouter(http, controller)
  }
}
