class Activity {
  private readonly _name: string

  private constructor(name: string) {
    this._name = name
  }

  static valueOf(name: string): Activity {
    return new Activity(name)
  }

  get name(): string {
    return this._name
  }
}

export default Activity
