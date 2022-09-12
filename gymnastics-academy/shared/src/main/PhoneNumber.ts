const MAX_DDD_LENGTH = 3
const MIN_DDD_LENGTH = 2
const LENGTH_OF_PHONE_NUMBER = 9

class PhoneNumber {
  private readonly _ddd: number
  private readonly _number: number

  private constructor(ddd: number, number: number) {
    this._ddd = ddd
    this._number = number
    this.validate()
  }

  static of(ddd: number, number: number): PhoneNumber {
    return new PhoneNumber(ddd, number)
  }

  private validate(): void {
    if (
      this._ddd.toString().length > MAX_DDD_LENGTH ||
      this._ddd.toString().length < MIN_DDD_LENGTH
    )
      throw new Error('ddd is invalid')
    if (this._number.toString().length !== LENGTH_OF_PHONE_NUMBER)
      throw new Error('number is invalid')
  }

  get ddd(): number {
    return this._ddd
  }

  get number(): number {
    return this._number
  }
}

export default PhoneNumber
