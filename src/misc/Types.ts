export class PeriodEntry {
  date!: string // stored in format : dd-mm-yyyy
  notes?: string
  blood?: string

  constructor(date: string) {
    this.date = date
  }
}