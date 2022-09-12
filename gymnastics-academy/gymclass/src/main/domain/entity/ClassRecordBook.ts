import { isEqual } from 'date-fns'

import Entity from 'shared/src/main/domain/Entity'

import ClassRecordBookPage from '../valueobject/ClassRecordBookPage'

class ClassRecordBook extends Entity {
  private readonly _pages: ClassRecordBookPage[] = []

  public newRecord(date: Date, studentId: string, isPresent: boolean): void {
    this.page(date).newRecord(studentId, isPresent)
  }

  public page(date: Date): ClassRecordBookPage {
    let page = this._pages.find((page) => isEqual(page.date, date))
    if (page === undefined) {
      page = ClassRecordBookPage.of(date)
      this._pages.push(page)
    }
    return page
  }

  get pages(): ClassRecordBookPage[] {
    return this._pages
  }

  public find(date: Date, studentId: string): Array<{ studentId: string; present: boolean }> {
    const page = this.pages.find((page) => isEqual(page.date, date))
    if (page === undefined || page.records.length === 0) throw new Error('there is no record')
    return page.records
      .filter((record) => record.studentId === studentId)
      .map((record) => ({
        studentId: record.studentId,
        present: record.isPresent,
      }))
  }
}

export default ClassRecordBook
