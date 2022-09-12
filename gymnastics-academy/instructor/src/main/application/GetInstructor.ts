import InstructorRepository from '../domain/InstructorRepository'

interface GetInstructorInput {
  instructorId: string
}

interface PhoneNumbersInput {
  ddd: number
  number: number
}

interface GetInstructorOutput {
  id: string
  document: string
  name: string
  birthDate: Date
  phoneNumbers: PhoneNumbersInput[]
  academicDegree: string
}

class GetGymClass {
  constructor(private readonly instructorRepository: InstructorRepository) {}

  public async execute({ instructorId }: GetInstructorInput): Promise<GetInstructorOutput> {
    const instructor = await this.instructorRepository.findInstructor(instructorId)
    return {
      id: instructor.id,
      document: instructor.document,
      name: instructor.name,
      birthDate: instructor.birthDate,
      phoneNumbers: instructor.phoneNumbers.map((phoneNumber) => ({
        ddd: phoneNumber.ddd,
        number: phoneNumber.number,
      })),
      academicDegree: instructor.academicDegree.name,
    }
  }
}

export default GetGymClass
