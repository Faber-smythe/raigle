const dateDisplayOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric"
}

const dateStoreOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
}


export const isToday = (day: Date): boolean => {
  const checkedString = day.toLocaleString("FR-fr", {
    year: "numeric", month: "numeric", day: "numeric"
  })
  const todayString = (new Date()).toLocaleString("FR-fr", {
    year: "numeric", month: "numeric", day: "numeric"
  })
  return checkedString == todayString
}

export const getNextDay = (day: Date) => {
  const newDay = new Date(day.getTime())
  newDay.setDate(newDay.getDate() + 1)
  return newDay
}

export const getPreviousDay = (day: Date) => {
  const newDay = new Date(day.getTime())
  newDay.setDate(newDay.getDate() - 1)
  return newDay
}

export const getWeekfromDay = (day: Date): Date[] => {
  const currentDay = new Date(day.getTime())
  let week: Date[] = []
  for (let i = 1; i <= 7; i++) {
    const currentDayIndex = currentDay.getDay() == 0 ? 7 : currentDay.getDay() // sunday is index 0 /!\
    let first = currentDay.getDate() - currentDayIndex + i
    let day = new Date(currentDay.setDate(first))
    week.push(day)
  }
  return week
}

export const changeWeek = (current: Date | Date[], direction: "previous" | "next"): Date[] => {
  let currentDay
  if (Array.isArray(current) && !current.length) return []
  if (Array.isArray(current)) {
    currentDay = new Date(current[0].getTime())
  } else {
    currentDay = new Date(current.getTime())
  }
  const currentMonday = getWeekfromDay(currentDay)[0]
  const lastSaturday = new Date(new Date(currentMonday.getTime()).setDate(currentMonday.getDate() - 2))
  const nextMonday = new Date(new Date(currentMonday.getTime()).setDate(currentMonday.getDate() + 7))

  return direction == "previous" ? getWeekfromDay(lastSaturday) : getWeekfromDay(nextMonday)

}

export const formatDateForDisplay = (date: Date): string => date.toLocaleString("FR-fr", dateDisplayOptions)
export const formatDateForStorage = (date: Date): string => date.toLocaleString("FR-fr", dateStoreOptions).split("/").join("-")

export const getDateFromStorageFormat = (date: string): Date => {
  // need some formatting to get the correct types and index values
  const splitDate = (date.split("-")).reverse()
  splitDate.forEach((string, i) => {
    let splitString = Array.from(string)
    while (splitString[0] == "0") {
      splitString.splice(0, 1)
    }
    splitDate[i] = splitString.join('')
  })

  const year = splitDate[0] as any as number
  const month = (splitDate[1] as any as number) - 1
  let dayDate = splitDate[2] as any as number

  // console.log(splitDate)
  // console.log(year)
  // console.log(month)
  // console.log(dayDate)
  const day = new Date(year, month, dayDate)
  // console.log(day)
  return day
}
