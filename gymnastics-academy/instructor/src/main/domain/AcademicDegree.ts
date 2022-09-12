class AcademicDegree {
  private readonly _name: string

  private constructor(name: string) {
    this._name = name
  }

  static of(name: string): AcademicDegree {
    return new AcademicDegree(name)
  }

  get name(): string {
    return this._name
  }
}

export default AcademicDegree
