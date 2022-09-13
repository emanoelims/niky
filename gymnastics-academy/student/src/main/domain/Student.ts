import Address from './Address'
import Entity from '@shared/domain/Entity'
import PhoneNumber from '@shared/PhoneNumber'

interface StudentParams {
  id?: string
  name: string
  enrollStudent: string
  birthDate: Date
  height: number
  weight: number
  address: Address
}

interface PhoneNumberParams {
  ddd: number
  number: number
}

class Student extends Entity {
  private readonly _name: string
  private readonly _enrollStudent: string
  private readonly _birthDate: Date
  private readonly _height: number
  private readonly _weight: number
  private readonly _phoneNumbers: PhoneNumber[] = []
  private readonly _address: Address

  constructor({ id, name, enrollStudent, birthDate, height, weight, address }: StudentParams) {
    super(id)
    this._name = name
    this._enrollStudent = enrollStudent
    this._birthDate = birthDate
    this._height = height
    this._weight = weight
    this._address = address
  }

  public addPhoneNumber(ddd: number, number: number): void {
    this._phoneNumbers.push(PhoneNumber.of(ddd, number))
  }

  public addPhoneNumbers(phoneNumbers: PhoneNumberParams[]): void {
    phoneNumbers.forEach((phoneNumber) => {
      this.addPhoneNumber(phoneNumber.ddd, phoneNumber.number)
    })
  }

  get name(): string {
    return this._name
  }

  get enrollStudent(): string {
    return this._enrollStudent
  }

  get birthDate(): Date {
    return this._birthDate
  }

  get height(): number {
    return this._height
  }

  get weight(): number {
    return this._weight
  }

  get phoneNumbers(): PhoneNumber[] {
    return this._phoneNumbers
  }

  get address(): Address {
    return this._address
  }
}

export default Student
