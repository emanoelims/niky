import { isBefore } from 'date-fns'

import Address from './Address'
import Entity from 'shared/src/main/domain/Entity'
import PhoneNumber from 'shared/src/main/PhoneNumber'

interface StudentParams {
  name: string
  enrollStudent: string
  birthDate: Date
  height: number
  weight: number
  phoneNumber: PhoneNumber
  address: Address
}

class Student extends Entity {
  private readonly _name: string
  private readonly _erollStudent: string
  private readonly _birthDate: Date
  private readonly _height: number
  private readonly _weight: number
  private readonly _phoneNumbers: PhoneNumber[] = []
  private readonly _address: Address

  constructor({
    name,
    enrollStudent,
    birthDate,
    height,
    weight,
    phoneNumber,
    address,
  }: StudentParams) {
    super()
    this._name = name
    this._erollStudent = enrollStudent
    this._birthDate = birthDate
    this._height = height
    this._weight = weight
    this._phoneNumbers.push(phoneNumber)
    this._address = address
    this.validate()
  }

  public addPhoneNumber(ddd: number, number: number): void {
    this._phoneNumbers.push(PhoneNumber.of(ddd, number))
  }

  private validate(): void {
    if (this._name.trim() === '') throw Error('name cannot be null')
    if (isBefore(Date.now(), this._birthDate)) throw Error('date is not valid')
    if (this._height <= 0) throw Error('height must be greater than zero')
    if (this._weight <= 0) throw Error('weight must be greater than zero')
    if (this._phoneNumbers.length === 0) throw new Error('phoneNumber cannot be null')
  }

  get name(): string {
    return this._name
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
