import StudentRepository from '../domain/StudentRepository'

interface GetStudentInput {
  studentId: string
}

interface PhoneNumberInput {
  ddd: number
  number: number
}

interface AddressInput {
  zip: number
  street: string
  number: number
  neighborhood: string
  city: string
  state: string
  complement?: string
}

interface GetStudentOutput {
  id: string
  name: string
  birthDate: Date
  height: number
  weight: number
  phoneNumbers: PhoneNumberInput[]
  address: AddressInput
}

class GetStudent {
  constructor(private readonly studentRepository: StudentRepository) {}

  public async execute({
    studentId,
  }: GetStudentInput): Promise<GetStudentOutput> {
    const student = await this.studentRepository.findStudent(studentId)
    return {
      id: student.id,
      name: student.name,
      birthDate: student.birthDate,
      height: student.height,
      weight: student.weight,
      phoneNumbers: student.phoneNumbers.map((phoneNumber) => ({
        ddd: phoneNumber.ddd,
        number: phoneNumber.number,
      })),
      address: {
        zip: student.address.zip,
        street: student.address.street,
        number: student.address.number,
        neighborhood: student.address.neighborhood,
        city: student.address.city,
        state: student.address.state,
      },
    }
  }
}

export default GetStudent
