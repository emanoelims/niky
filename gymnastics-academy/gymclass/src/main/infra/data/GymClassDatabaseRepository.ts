import { randomUUID } from 'crypto'
import { PrismaClient } from '@prisma/client'

import GymClass from '@gymclass/domain/entity/GymClass'
import GymClassRepository from '@gymclass/domain/GymClassRepository'
import Lesson from '@gymclass/domain/valueobject/Lesson'
import Activity from '@gymclass/domain/valueobject/Activity'

class GymClassDatabaseRepository implements GymClassRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async createGymClass(gymClass: GymClass): Promise<void> {
    await this.prismaClient.gymClass.create({
      data: {
        id: gymClass.id,
        active: gymClass.isActive,
        maximum_student: gymClass.maximumStudents,
        activity: {
          create: {
            id: randomUUID(),
            name: gymClass.activity.name,
          },
        },
        lesson: {
          create: {
            id: randomUUID(),
            start_time: gymClass.lesson.startTime,
            duration: gymClass.lesson.duration,
          },
        },
        start_date: gymClass.startDate,
        end_date: gymClass.endDate,
        instructor: {
          connect: {
            id: gymClass.instructorId,
          },
        },
      },
    })
  }

  public async findGymClass(gymClassId: string): Promise<GymClass> {
    const gymClass = await this.prismaClient.gymClass.findUnique({
      where: { id: gymClassId },
      include: {
        lesson: true,
        activity: true,
        enrollClass: true,
      },
    })
    if (gymClass === null) {
      throw new Error('gymClass not found')
    }
    return new GymClass({
      id: gymClass.id,
      startDate: gymClass.start_date,
      endDate: gymClass.end_date,
      active: gymClass.active,
      studentsId: gymClass.enrollClass.map((el) => el.student_id),
      lesson: Lesson.of(gymClass.lesson.start_time, gymClass.lesson.duration),
      activity: Activity.valueOf(gymClass.activity.name),
      instructorId: gymClass.instructor_id,
      maximumStudents: gymClass.maximum_student,
      studentMonitorId: gymClass.student_monitor_id ?? undefined,
    })
  }

  public async findGymClasses(active: boolean | undefined): Promise<GymClass[]> {
    const output = await this.prismaClient.gymClass.findMany({
      include: {
        lesson: true,
        activity: true,
      },
    })
    return output.map(
      (gymClass) =>
        new GymClass({
          id: gymClass.id,
          maximumStudents: gymClass.maximum_student,
          startDate: gymClass.start_date,
          endDate: gymClass.end_date,
          active: gymClass.active,
          activity: Activity.valueOf(gymClass.activity.name),
          instructorId: gymClass.instructor_id,
          lesson: Lesson.of(gymClass.lesson.start_time, gymClass.lesson.duration),
          studentMonitorId: gymClass.student_monitor_id || undefined,
        })
    )
  }

  public async enrollStudent(date: Date, gymClassId: string, studentId: string): Promise<void> {
    await this.prismaClient.enrollClass.create({
      data: {
        id: randomUUID(),
        date,
        gym_class_id: gymClassId,
        student_id: studentId,
      },
    })
  }

  public async updateGymClass(gymClassId: string, newGymClass: GymClass): Promise<void> {
    await this.prismaClient.gymClass.update({
      where: { id: gymClassId },
      data: {
        maximum_student: newGymClass.maximumStudents,
        active: newGymClass.isActive,
        student_monitor: {
          connect: {
            id: newGymClass.studentMonitorId,
          },
        },
      },
    })
  }

  public async studentsEnrolled(gymClassId: string): Promise<string[]> {
    const enrollClassList = await this.prismaClient.enrollClass.findMany({
      where: { gym_class_id: gymClassId },
    })
    return enrollClassList.map((e) => {
      return e.student_id
    })
  }

  public async makeCallStudent(
    date: Date,
    gymClassId: string,
    studentId: string,
    present: boolean
  ): Promise<void> {
    const all = await this.prismaClient.enrollClass.findMany()
    const enrolClass = all.filter(
      (e) => e.student_id === studentId && e.gym_class_id === gymClassId
    )
    if (enrolClass.length === 0) {
      throw new Error('enroll not found')
    }
    await this.prismaClient.classRecordBook.create({
      data: {
        date,
        present,
        id: randomUUID(),
        enroll_class: {
          connect: {
            id: enrolClass[0].id,
          },
        },
      },
    })
  }
}

export default GymClassDatabaseRepository
