import Entity from '@shared/domain/Entity'
import PhoneNumber from '@shared/PhoneNumber'

import AcademicDegree from './AcademicDegree'

interface InstructorParams {
  id?: string
  document: string
  name: string
  birthDate: Date
  academicDegree: AcademicDegree
}

interface PhoneNumberParams {
  ddd: number
  number: number
}

class Instructor extends Entity {
  private readonly _document: string
  private readonly _name: string
  private readonly _birthDate: Date
  private _academicDegree: AcademicDegree
  private readonly _phoneNumbers: PhoneNumber[] = []

  constructor({ id, document, name, birthDate, academicDegree }: InstructorParams) {
    super(id)
    this._document = document
    this._name = name
    this._birthDate = birthDate
    this._academicDegree = academicDegree
  }

  public changeAcademicDegree(academicDegree: AcademicDegree): void {
    this._academicDegree = academicDegree
  }

  public addPhoneNumber(ddd: number, number: number): void {
    this._phoneNumbers.push(PhoneNumber.of(ddd, number))
  }

  addPhoneNumbers(phoneNumbers: PhoneNumberParams[]): void {
    phoneNumbers.forEach((phoneNumber) => {
      this.addPhoneNumber(phoneNumber.ddd, phoneNumber.number)
    })
  }

  get name(): string {
    return this._name
  }

  get document(): string {
    return this._document
  }

  get birthDate(): Date {
    return this._birthDate
  }

  get academicDegree(): AcademicDegree {
    return this._academicDegree
  }

  get phoneNumbers(): PhoneNumber[] {
    return this._phoneNumbers
  }
}

export default Instructor
