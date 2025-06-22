import { useState, useEffect, useRef } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useOutletContext, useParams, useNavigate } from "react-router"
import Drop from '@/components/Drop'
import { PeriodEntry as Entry } from "@/misc/Types"
import { formatDateForDisplay, formatDateForStorage, isToday, getDateFromStorageFormat } from "@/misc//Utils"
import { usePeriodStore } from "@/store/usePeriodStore"



const DayView = () => {
  const updateEntryStore = useOutletContext() as Function
  const dataEntries = usePeriodStore(state => state.entries);

  const { dayParam } = useParams();
  const navigate = useNavigate();

  const [day, setDay] = useState(new Date())
  const [entry, setEntry] = useState(new Entry(formatDateForStorage(new Date())))
  const updateNoteTimeout = useRef<number | null>(null)


  useEffect(() => {
    // check for date in the url
    let targetDay
    if (dayParam) {
      targetDay = getDateFromStorageFormat(dayParam)
      if (targetDay) {
        setDay(targetDay)
        console.log(dataEntries)
      }
    }
    if (!dayParam || !targetDay) {
      // default to current date
      navigate(`/day/${formatDateForStorage(new Date())}`)
    }
  }, [dayParam])


  useEffect(() => {
    // check if day already has entry
    let entry = dataEntries.find(entry => (entry.date == formatDateForStorage(day)))
    if (!entry) entry = new Entry(formatDateForStorage(day))
    setEntry(entry)
    console.log(entry.notes)
  }, [day])


  const handleBloodUpdate = (blood?: string) => {
    const newEntry = {
      ...entry,
      blood: blood
    }
    setEntry(newEntry)
    updateEntryStore(newEntry) // this will either remove the entry if empty, or else save it

  }

  const goToYesterday = () => {
    const newDay = new Date(day.getTime())
    newDay.setDate(newDay.getDate() - 1)
    navigate(`/day/${formatDateForStorage(newDay)}`)
  }

  const goToTomorrow = () => {
    const newDay = new Date(day.getTime())
    newDay.setDate(newDay.getDate() + 1)
    navigate(`/day/${formatDateForStorage(newDay)}`)

  }

  // let updateNoteTimeOut: number

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (updateNoteTimeout.current) clearTimeout(updateNoteTimeout.current)
    const udpatedValue = e.target.value
    
    console.log(udpatedValue)

    const newEntry = {
      ...entry,
      notes: udpatedValue
    }
    setEntry(newEntry)

    updateNoteTimeout.current = window.setTimeout(() => {
      updateEntryStore(newEntry)
    }, 250)
  }

  return (
    <section id="dayview-section" className="flex flex-col grow">
      {/* date navigation */}
      <div className="h-1/8 border border-black flex items-center justify-center ">
        <ChevronLeftIcon className="size-8 hover:cursor-pointer" onClick={goToYesterday} />
        <p className={`text-center m-2 capitalize w-6/10  rounded-md ${isToday(day) ? "today" : ""}`} >
          {formatDateForDisplay(day)}
          <br />
          {day.toLocaleString("FR-fr", { year: "numeric" })}
        </p>
        <ChevronRightIcon className="size-8 hover:cursor-pointer" onClick={goToTomorrow} />
      </div>
      {/* notes */}
      <div className="h-3/8 border border-black p-2 text-sm">
        <textarea className="w-full h-full px-2 py-1 bg-gray-50 border-1 border-gray-100 outline-0 focus:border-black rounded-md" onChange={handleNoteChange} placeholder="Ajouter une note..." value={entry.notes ?? ""}>
          {/* <p className="p-1 m-1"></p> */}
        </textarea>

      </div>
      {/* blood */}
      <div className="h-1/2 pb-8 border border-black flex justify-center items-center">
        <Drop handleBloodUpdate={handleBloodUpdate} blood={entry.blood} className="h-8/10 shadow-lg shadow-red-100 bg-gray-50 w-fit p-1 rounded-full" />
      </div>
    </section >
  )
}

export default DayView