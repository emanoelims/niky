import HttpRequest from 'shared/src/main/domain/http/HttpRequest'
import HttpResponse from 'shared/src/main/domain/http/HttpResponse'

interface GymClassApi {
  create: (request: HttpRequest) => Promise<HttpResponse>
  list: (request: HttpRequest) => Promise<HttpResponse>
  findGymClass: (id: string) => Promise<HttpResponse>
  enrollStudent: (date: Date, gymClassId: string, studentId: string) => Promise<HttpResponse>
  addStudentMonitor: (gymClassId: string, studentId: string) => Promise<HttpResponse>
  addStudentPresence: (
    date: string,
    gymClassId: string,
    studentId: string,
    isPresent: boolean
  ) => Promise<HttpResponse>
  activateGymClass: (gymClassId: string) => Promise<HttpResponse>
  getStudentPresences: (
    date: string,
    gymClassId: string,
    studentId: string
  ) => Promise<HttpResponse>
}

export default GymClassApi
