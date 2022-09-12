import ClassRecordLine from './ClassRecordLine'

class ClassRecordBookPage {
  private readonly _date: Date
  private readonly _records: ClassRecordLine[] = []

  private constructor(date: Date) {
    this._date = date
  }

  static of(date: Date): ClassRecordBookPage {
    return new ClassRecordBookPage(date)
  }

  public newRecord(studentId: string, isPresent: boolean): void {
    this._records.push(ClassRecordLine.of(studentId, isPresent))
  }

  get date(): Date {
    return this._date
  }

  get records(): ClassRecordLine[] {
    return this._records
  }
}

export default ClassRecordBookPage
