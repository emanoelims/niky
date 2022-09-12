class Lesson {
  private readonly _startTime: Date
  private readonly _duration: Date

  constructor(startTime: Date, duration: Date) {
    this._startTime = startTime
    this._duration = duration
  }

  static of(startTime: Date, duration: Date): Lesson {
    return new Lesson(startTime, duration)
  }

  get startTime(): Date {
    return this._startTime
  }

  get duration(): Date {
    return this._duration
  }
}

export default Lesson
