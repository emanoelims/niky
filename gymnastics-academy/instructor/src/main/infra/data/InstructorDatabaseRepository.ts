import { randomUUID } from 'crypto'
import { PrismaClient } from '@prisma/client'

import Instructor from '@instructor/domain/Instructor'
import InstructorRepository from '@instructor/domain/InstructorRepository'
import AcademicDegree from '@instructor/domain/AcademicDegree'

class InstructorDatabaseRepository implements InstructorRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async createInstructor(instructor: Instructor): Promise<void> {
    await this.prismaClient.instructor.create({
      data: {
        id: instructor.id,
        name: instructor.name,
        document: instructor.document,
        birth_date: instructor.birthDate,
        academic_degree: {
          create: {
            id: randomUUID(),
            name: instructor.academicDegree.name,
          },
        },
        phones: {
          create: [
            ...instructor.phoneNumbers.map((phoneNumber) => ({
              id: randomUUID(),
              ddd: phoneNumber.ddd,
              number: phoneNumber.number,
            })),
          ],
        },
      },
    })
  }

  public async findInstructor(instructorId: string): Promise<Instructor> {
    const instructor = await this.prismaClient.instructor.findUnique({
      where: { id: instructorId },
      include: {
        academic_degree: true,
        phones: true,
      },
    })
    if (instructor === null) {
      throw new Error('instructor not found')
    }
    const newInstructor = new Instructor({
      id: instructor.id,
      document: instructor.document,
      name: instructor.name,
      birthDate: instructor.birth_date,
      academicDegree: AcademicDegree.of(instructor.academic_degree.name),
    })
    newInstructor.addPhoneNumbers(
      instructor.phones.map(({ ddd, number }: { ddd: number; number: number }) => ({
        ddd,
        number,
      }))
    )
    return newInstructor
  }
}

export default InstructorDatabaseRepository
