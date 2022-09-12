interface AddressParams {
  zip: number
  street: string
  number: number
  neighborhood: string
  city: string
  state: string
  complement?: string
}

class Address {
  private readonly _zip: number
  private readonly _street: string
  private readonly _number: number
  private readonly _neighborhood: string
  private readonly _city: string
  private readonly _state: string
  private readonly _complement?: string

  private constructor({
    zip,
    street,
    number,
    neighborhood,
    city,
    state,
    complement,
  }: AddressParams) {
    this._zip = zip
    this._street = street
    this._number = number
    this._neighborhood = neighborhood
    this._city = city
    this._state = state
    this._complement = complement
  }

  static of(params: AddressParams): Address {
    return new Address(params)
  }

  get zip(): number {
    return this._zip
  }

  get street(): string {
    return this._street
  }

  get number(): number {
    return this._number
  }

  get neighborhood(): string {
    return this._neighborhood
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get complement(): string | undefined {
    return this._complement
  }
}

export default Address
