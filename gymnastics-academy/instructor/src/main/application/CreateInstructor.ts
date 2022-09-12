import Instructor from '../domain/Instructor'
import InstructorRepository from '../domain/InstructorRepository'
import AcademicDegree from '../domain/AcademicDegree'

interface PhoneNumberInput {
  ddd: number
  number: number
}

interface CreateInstructorInput {
  name: string
  birthDate: Date
  document: string
  academicDegree: string
  phoneNumbers: PhoneNumberInput[]
}

interface CreateInstructorOutput {
  id: string
}

class CreateInstructor {
  constructor(private readonly instructorRepository: InstructorRepository) {}

  public async execute(input: CreateInstructorInput): Promise<CreateInstructorOutput> {
    const { name, birthDate, document, academicDegree, phoneNumbers } = input
    const instructor = new Instructor({
      document,
      name,
      birthDate,
      academicDegree: AcademicDegree.of(academicDegree),
    })
    instructor.addPhoneNumbers(phoneNumbers)
    await this.instructorRepository.createInstructor(instructor)
    return { id: instructor.id }
  }
}

export default CreateInstructor
