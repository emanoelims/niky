import Entity from 'shared/src/main/domain/Entity'

import Lesson from '../valueobject/Lesson'
import Activity from '../valueobject/Activity'
import ClassRecordBook from './ClassRecordBook'
import StudentMonitorService from '../service/StudentMonitorService'

interface GymClassParams {
  instructorId: string
  studentMonitorId?: string
  lesson: Lesson
  activity: Activity
  maximumStudents: number
  startDate: Date
  endDate: Date
}

class GymClass extends Entity {
  private readonly _instructorId: string
  private _studentMonitorId?: string
  private readonly _lesson: Lesson
  private readonly _activity: Activity
  private readonly _maximumStudents: number
  private readonly _startDate: Date
  private readonly _endDate: Date
  private readonly _studentsId: string[] = []
  private readonly _classRecordBook: ClassRecordBook
  private _isActive: boolean = false

  constructor({
    instructorId,
    studentMonitorId,
    lesson,
    activity,
    maximumStudents,
    startDate,
    endDate,
  }: GymClassParams) {
    super()
    this._instructorId = instructorId
    this._studentMonitorId = studentMonitorId
    this._lesson = lesson
    this._activity = activity
    this._maximumStudents = maximumStudents
    this._startDate = startDate
    this._endDate = endDate
    this._classRecordBook = new ClassRecordBook()
  }

  public async changeStudentMonitor(
    studentId: string,
    studentMonitorService: StudentMonitorService
  ): Promise<void> {
    const isMonitor = await studentMonitorService.apply(studentId)
    if (isMonitor) throw Error('student already monitor of a class')
    if (this.getStudent(studentId) === undefined)
      throw new Error('student must be enrolled in the class')
    this._studentMonitorId = studentId
  }

  public enrollStudent(studentId: string): void {
    if (this._studentsId.length >= this._maximumStudents)
      throw new Error('maximum number of students achieved')
    this._studentsId.push(studentId)
  }

  public addStudentPresence(date: Date, studentId: string, isPresent: boolean): void {
    if (!this._isActive) throw Error('the class must be active')
    if (this.getStudent(studentId) === undefined)
      throw new Error('student must be enrolled in the class')
    this._classRecordBook.newRecord(date, studentId, isPresent)
  }

  public activate(): void {
    if (this._studentsId.length === 0) throw new Error('cannot activate class without students')
    if (this._studentMonitorId === undefined)
      throw new Error('cannot activate class without a student monitor')
    this._isActive = true
  }

  public getStudent(studentId: string): string | undefined {
    return this.studentsId.find((s) => s === studentId)
  }

  get instructorId(): string {
    return this._instructorId
  }

  get studentMonitorId(): string | undefined {
    return this._studentMonitorId
  }

  get lesson(): Lesson {
    return this._lesson
  }

  get activity(): Activity {
    return this._activity
  }

  get maximumStudents(): number {
    return this._maximumStudents
  }

  get startDate(): Date {
    return this._startDate
  }

  get endDate(): Date {
    return this._endDate
  }

  get studentsId(): string[] {
    return this._studentsId
  }

  get classRecordBook(): ClassRecordBook {
    return this._classRecordBook
  }

  get isActive(): boolean {
    return this._isActive
  }
}

export default GymClass
