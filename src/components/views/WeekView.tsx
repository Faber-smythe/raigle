import { useEffect, useState } from 'react';
import type { BaseSyntheticEvent } from 'react'
import { PeriodEntry as Entry } from '@/misc/Types';
import { formatDateForDisplay, formatDateForStorage, isToday, getWeekfromDay, changeWeek, getDateFromStorageFormat } from "@/misc/Utils"
import { PencilSquareIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useOutletContext, useNavigate, useParams } from 'react-router';
import { usePeriodStore } from '@/store/usePeriodStore';
import Drop from '@/components/Drop';
import TodayButton from '@/components/TodayButton';

interface WeekViewDayProp {
  day: Date
}

const WeekViewDay = ({ day }: WeekViewDayProp) => {

  const updateEntryStore = useOutletContext() as Function
  const dataEntries = usePeriodStore(state => state.entries);

  const [entry, setEntry] = useState(new Entry(formatDateForStorage(new Date(day.getTime()))))
  const navigate = useNavigate()

  useEffect(() => {
    // check if day already has entry
    let entry = dataEntries.find(entry => (entry.date == formatDateForStorage(day)))
    if (!entry) entry = new Entry(formatDateForStorage(new Date()))
    setEntry(entry)
  }, [day])

  const handleBloodUpdate = (blood?: string) => {
    const newEntry = {
      ...entry,
      blood: blood
    }
    setEntry(newEntry)
    updateEntryStore(newEntry) // this will either remove the entry if empty, or else save it

  }

  const handleWeekDayClick = (e: BaseSyntheticEvent) => {
    if (e.target.classList.contains("drop-SVG")) {
      console.log("don't navigate ")
    } else {
      console.log(" navigate to : ", `/day/${formatDateForStorage(day)}`)
      navigate(`/day/${formatDateForStorage(day)}`)
    }
  }

  return (
    <div className={`flex items-center justify-around relative h-1/7 p-1 m-1 rounded-md bg-white min-h-7`} onClick={handleWeekDayClick}>
      <p className={`flex justify-center text-xs w-5/10 py-1 rounded-md capitalize ${isToday(day) ? "today" : "border border-gray-50"}`}>{formatDateForDisplay(day)}</p>
      <div className="w-4/10 px-1 flex flex-col items-center">
        {entry.notes && <PencilSquareIcon className="size-4" />}
        {entry.notes &&
          <p className="block w-10/10 italic text-xs whitespace-nowrap overflow-hidden text-ellipsis self-start">
            {entry.notes}
          </p>
        }
      </div>
      <Drop
        handleBloodUpdate={handleBloodUpdate}
        blood={entry.blood}
        className="flex justify-center size-9 hover:cursor-pointer p-1 sm:p-.5 rounded-full border border-pink-300"
      />
    </div >
  )
}

const WeekView = () => {

  const [week, setWeek] = useState([] as Date[])
  const { dayParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  }, [])

  useEffect(() => {
    // check for date in the url
    let targetDay
    if (dayParam) {
      targetDay = getDateFromStorageFormat(dayParam)
      if (targetDay) {
        const targetWeek = getWeekfromDay(targetDay)
        setWeek(targetWeek)
      }
    }
    if (!dayParam || !targetDay) {
      // default to current week
      const currentWeekMonday = getWeekfromDay(new Date())[0]
      navigate(`/week/${formatDateForStorage(currentWeekMonday)}`)
    }
  }, [dayParam])

  const goToWeekBefore = () => {
    const weekBefore = changeWeek(week, "previous")
    setWeek(weekBefore)
    navigate(`/week/${formatDateForStorage(weekBefore[0])}`) // TODO navigate
  }

  const goToComingWeek = () => {
    const comingWeek = changeWeek(week, "next")
    setWeek(comingWeek)
    navigate(`/week/${formatDateForStorage(comingWeek[0])}`) // TODO navigate
  }

  const CurrentWeekLabel = ({ week }: { week: Date[] }) => {

    const firstDay = week[0].toLocaleString("FR-fr", { day: "numeric" })
    const firstDayMonth = week[0].toLocaleString("FR-fr", { month: "short" })
    const lastDay = week[6].toLocaleString("FR-fr", { day: "numeric" })
    const lastDayMonth = week[6].toLocaleString("FR-fr", { month: "short" })

    return <p className="text-center m-2 capitalize w-6/10 ">{firstDay} {firstDayMonth != lastDayMonth ? firstDayMonth : ""} - {lastDay} {lastDayMonth}</p>
  }

  return (
    week &&
    <section id="weekview-section" className="flex flex-col grow relative overflow-hidden">
      {!(week.map(date => formatDateForStorage(date)).find(date => date == formatDateForStorage(new Date()))) &&
        <div className=" flex flex-col items-center justify-center absolute top-1 left-1">
          <TodayButton />
        </div>
      }
      <div className="flex h-1/9 justify-center items-center pt-5">
        <ChevronLeftIcon className="size-8 hover:cursor-pointer" onClick={goToWeekBefore} />
        {week.length && <CurrentWeekLabel week={week} />}
        <ChevronRightIcon className="size-8  hover:cursor-pointer" onClick={goToComingWeek} />
      </div>
      <div className="flex flex-col h-8/9 overflow-scroll">
        {week.map(day =>
          <WeekViewDay key={day.toLocaleString("FR-fr", { weekday: "long" })} day={day} />
        )}
      </div>
    </section>
  )

}

export default WeekView