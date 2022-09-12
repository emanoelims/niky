class ClassRecordLine {
  private readonly _studentId: string
  private readonly _isPresent: boolean

  private constructor(studentId: string, isPresent: boolean) {
    this._studentId = studentId
    this._isPresent = isPresent
  }

  static of(studentId: string, isPresent: boolean): ClassRecordLine {
    return new ClassRecordLine(studentId, isPresent)
  }

  get studentId(): string {
    return this._studentId
  }

  get isPresent(): boolean {
    return this._isPresent
  }
}

export default ClassRecordLine
