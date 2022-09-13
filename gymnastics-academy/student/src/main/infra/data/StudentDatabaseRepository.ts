import { randomUUID } from 'crypto'
import { PrismaClient } from '@prisma/client/scripts/default-index'

import Student from '@student/domain/Student'
import StudentRepository from '@student/domain/StudentRepository'
import Address from '@student/domain/Address'

class StudentDatabaseRepository implements StudentRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async addStudent(student: Student): Promise<void> {
    await this.prismaClient.student.create({
      data: {
        id: student.id,
        enroll_student: student.enrollStudent,
        name: student.name,
        birth_date: student.birthDate,
        height: student.height,
        weight: student.weight,
        phones: {
          create: student.phoneNumbers.map(({ ddd, number }) => ({
            id: randomUUID(),
            ddd,
            number,
          })),
        },
        address: {
          create: {
            id: randomUUID(),
            zip: student.address.zip,
            street: student.address.street,
            number: student.address.number,
            neighborhood: student.address.neighborhood,
            city: student.address.city,
            state: student.address.state,
            complement: student.address.complement,
          },
        },
      },
    })
  }

  public async findStudent(studentId: string): Promise<Student> {
    const student = await this.prismaClient.student.findUnique({
      where: { id: studentId },
      include: {
        address: true,
        phones: true,
      },
    })
    if (student === null) throw new Error('student not found')
    const newStudent = new Student({
      id: student.id,
      name: student.name,
      enrollStudent: student.enroll_student,
      birthDate: student.birth_date,
      height: student.height,
      weight: student.weight,
      address: Address.of({
        ...student.address,
      }),
    })
    newStudent.addPhoneNumbers(
      student.phones.map(({ ddd, number }: { ddd: number; number: number }) => ({
        ddd,
        number,
      }))
    )
    return newStudent
  }
}

export default StudentDatabaseRepository
