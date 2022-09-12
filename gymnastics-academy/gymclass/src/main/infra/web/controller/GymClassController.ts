import GymClassApi from '../GymClassApi'
import HttpRequest from 'shared/src/main/domain/http/HttpRequest'
import HttpResponse from 'shared/src/main/domain/http/HttpResponse'

import GymClassRepository from 'gymclass/src/main/domain/GymClassRepository'

import CreateGymClass from 'gymclass/src/main/application/CreateGymClass'
import GetAllGymClasses from 'gymclass/src/main/application/GetAllGymClasses'
import GetGymClass from 'gymclass/src/main/application/GetGymClass'
import EnrollStudent from 'gymclass/src/main/application/EnrollStudent'
import AddStudentMonitor from 'gymclass/src/main/application/AddStudentMonitor'
import AddStudentPresence from 'gymclass/src/main/application/AddStudentPresence'
import ActivateGymClass from 'gymclass/src/main/application/ActivateGymClass'
import GetStudentPresences from 'gymclass/src/main/application/GetStudentPresences'

class GymClassController implements GymClassApi {
  constructor(private readonly gymClassRepository: GymClassRepository) {}

  public async create(request: HttpRequest): Promise<HttpResponse> {
    const { maximumStudents, startDate, endDate, lesson, activity, instructorId } = request.body
    const createGymClass = new CreateGymClass(this.gymClassRepository)
    const output = await createGymClass.execute({
      maximumStudents,
      startDate,
      endDate,
      lesson,
      activity,
      instructorId,
    })
    return { statusCode: 201, body: output }
  }

  public async findGymClass(gymClassId: string): Promise<HttpResponse> {
    const getGymClass = new GetGymClass(this.gymClassRepository)
    try {
      const output = await getGymClass.execute({ gymClassId })
      return { statusCode: 200, body: output }
    } catch (e) {
      return { statusCode: 404 }
    }
  }

  public async list(request: HttpRequest): Promise<HttpResponse> {
    const getAllGymClasses = new GetAllGymClasses(this.gymClassRepository)
    try {
      const gymClasses = await getAllGymClasses.execute()
      return { statusCode: 200, body: gymClasses }
    } catch (e) {
      return { statusCode: 404 }
    }
  }

  public async enrollStudent(gymClassId: string, studentId: string): Promise<HttpResponse> {
    const enrollStudent = new EnrollStudent(this.gymClassRepository)
    try {
      await enrollStudent.execute({ gymClassId, studentId })
      return { statusCode: 201 }
    } catch (e) {
      return { statusCode: 400 }
    }
  }

  public async addStudentMonitor(gymClassId: string, studentId: string): Promise<HttpResponse> {
    const addStudentMonitor = new AddStudentMonitor(this.gymClassRepository)
    try {
      await addStudentMonitor.execute({
        gymClassId,
        studentId,
      })
      return { statusCode: 201 }
    } catch (e) {
      return { statusCode: 400 }
    }
  }

  public async addStudentPresence(
    date: string,
    gymClassId: string,
    studentId: string,
    isPresent: boolean
  ): Promise<HttpResponse> {
    const addStudentMonitor = new AddStudentPresence(this.gymClassRepository)
    try {
      await addStudentMonitor.execute({
        gymClassId,
        studentId,
        date: new Date(date),
        isPresent,
      })
      return { statusCode: 201 }
    } catch (e) {
      return { statusCode: 400 }
    }
  }

  public async activateGymClass(gymClassId: string): Promise<HttpResponse> {
    const activateGymClass = new ActivateGymClass(this.gymClassRepository)
    try {
      await activateGymClass.execute({ gymClassId })
      return { statusCode: 201 }
    } catch (e) {
      return { statusCode: 400 }
    }
  }

  public async getStudentPresences(
    date: string,
    gymClassId: string,
    studentId: string
  ): Promise<HttpResponse> {
    const getStudentPresences = new GetStudentPresences(this.gymClassRepository)
    try {
      const output = await getStudentPresences.execute({
        date: new Date(date),
        gymClassId,
        studentId,
      })
      return { statusCode: 200, body: output }
    } catch (e) {
      return { statusCode: 400 }
    }
  }
}

export default GymClassController
