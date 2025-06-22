
import Calendar from 'react-calendar';
import { useState, useEffect, useRef } from 'react';
import { formatDateForDisplay, formatDateForStorage, getDateFromStorageFormat } from '@/misc/Utils';
import type { TileArgs } from 'react-calendar';
import { useOutletContext, Link, useParams, useNavigate } from 'react-router';
import { PeriodEntry as Entry } from '@/misc/Types';
import { usePeriodStore } from '@/store/usePeriodStore';
import Drop from '@/components/Drop';
import TodayButton from '@/components/TodayButton';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface WeekViewDayProp {
  day: Date
}

const MonthViewDay = ({ day }: WeekViewDayProp) => {

  const updateEntryStore = useOutletContext() as Function
  const dataEntries = usePeriodStore(state => state.entries);
  // const dataContext = useOutletContext() as Entry[]
  const [entry, setEntry] = useState(new Entry(formatDateForStorage(new Date(day.getTime()))))

  useEffect(() => {
    // check if day already has entry
    let entry = dataEntries.find(entry => (entry.date == formatDateForStorage(day)))
    if (!entry) entry = new Entry(formatDateForStorage(day))
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



  return (


    <div className="flex justify-around align-center h-full">
      <Link to={`/day/${formatDateForStorage(day)}`} className="text-sm flex align-center justify-center flex-col border border-gray-100 text-center bg-white rounded-md p-1 m-2 w-3/10">Voir<br /> le jour</Link>
      <p className="text-sm text-center flex flex-col items-center justify-center">
        <Drop handleBloodUpdate={handleBloodUpdate} className="size-10" blood={entry.blood} />
        {formatDateForDisplay(day)}
      </p>
      <Link to={`/week/${formatDateForStorage(day)}`} className="text-sm flex align-center justify-center flex-col border border-gray-100 text-center bg-white rounded-md p-1 m-2 w-3/10">Voir<br /> la semaine </Link>
    </div>

  )
}

const MonthView = () => {

  const dataEntries = usePeriodStore(state => state.entries);
  const navigate = useNavigate()
  const [value, setValue] = useState<Value>(new Date());
  const [startDate, setStartDate] = useState<Date | undefined>();
  const calendarRef = useRef<HTMLDivElement | null>(null)

  const { dayParam } = useParams();

  useEffect(() => {
    let targetDay
    if (dayParam) {
      targetDay = getDateFromStorageFormat(dayParam)
      if (targetDay) {
        setValue(targetDay)
        navigate(`/month/${formatDateForStorage(targetDay)}`)
      }
    }

  }, [dayParam])

  const goBackToToday = () => {
    // set active start date but it causes the month navigation to freeze
    setStartDate(new Date())
  }
  const disableActiveStartDate = () => {
    // causes month navigation to work again
    setTimeout(() => setStartDate(undefined));
  }

  useEffect(() => {
    const calendarElement = calendarRef.current as HTMLDivElement;
    const navigationButtons = calendarElement.querySelectorAll('.react-calendar__navigation__arrow');

    navigationButtons.forEach(button => {
      button.addEventListener('click', disableActiveStartDate);
    });

    return () => {
      if (calendarElement) {
        navigationButtons.forEach(button => {
          button.removeEventListener('click', disableActiveStartDate);
        });
      }
    };
  }, []);

  const handleTileContent = (tile: TileArgs) => {
    const entry = dataEntries.find(entry => entry.date == formatDateForStorage(tile.date))
    if (entry && entry.blood) {
      return (
        <span className="block absolute left-0 bottom-0 w-full h-2" style={{ backgroundColor: `${entry.blood}` }}></span>
      )
    }
  }


  const handleTileClasses = (tile: TileArgs) => {
    let className = ""
    if (formatDateForStorage(tile.date) == formatDateForStorage(new Date())) {
      className += " today"
    }

    const entry = dataEntries.find(entry => entry.date == formatDateForStorage(tile.date))
    if (entry && entry.blood) {
      className += " bloody_tile"
    }
    return className
  }

  const handleDayClick = (day: Date) => {
    navigate(`/month/${formatDateForStorage(day)}`)
  }


  return (
    <section className="h-full flex flex-col relative justify-between">
      {true &&
        <div className=" flex flex-col items-center justify-center absolute top-1 left-1">
          <TodayButton callBack={goBackToToday} />
        </div>
      }
      <div className=" m-2 rounded-md flex items-center justify-center pt-5">
        <Calendar
          onChange={setValue}
          value={value}
          inputRef={calendarRef}
          activeStartDate={startDate}
          className="rounded h-full"
          tileClassName={handleTileClasses}
          tileContent={handleTileContent}
          onClickDay={handleDayClick}
        />
      </div>
      <div className="flex h-2/10 flex-col justify-end mb-3 relative">
        <MonthViewDay day={value as Date} />
      </div>
    </section>
  )

}

export default MonthView