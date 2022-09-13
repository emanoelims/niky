import Student from '../domain/Student'
import Address from '../domain/Address'
import StudentRepository from '../domain/StudentRepository'

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

interface CreateStudentInput {
  name: string
  enrollStudent: string
  birthDate: Date
  height: number
  weight: number
  phoneNumber: PhoneNumberInput
  address: AddressInput
}

interface CreateStudentOutput {
  id: string
}

class CreateStudent {
  constructor(private readonly studentRepository: StudentRepository) {}

  public async execute({
    name,
    birthDate,
    enrollStudent,
    height,
    weight,
    phoneNumber,
    address,
  }: CreateStudentInput): Promise<CreateStudentOutput> {
    const student = new Student({
      name,
      enrollStudent,
      birthDate,
      height,
      weight,
      address: Address.of(address),
    })
    student.addPhoneNumber(phoneNumber.ddd, phoneNumber.number)
    await this.studentRepository.addStudent(student)
    return { id: student.id }
  }
}

export default CreateStudent
