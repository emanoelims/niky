import PhoneNumber from 'shared/src/main/PhoneNumber'

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
    height,
    weight,
    phoneNumber,
    address,
  }: CreateStudentInput): Promise<CreateStudentOutput> {
    const student = new Student({
      name,
      birthDate,
      height,
      weight,
      phoneNumber: PhoneNumber.of(phoneNumber.ddd, phoneNumber.number),
      address: Address.of(address),
    })
    await this.studentRepository.addStudent(student)
    return { id: student.id }
  }
}

export default CreateStudent
