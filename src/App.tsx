
import { useEffect, useState } from 'react'
import StartingSplash from '@/components/StartingSplash'
import Navbar from '@/components/Navbar'
import { usePeriodStore } from '@/store/usePeriodStore';
import { PeriodEntry } from './misc/Types';

import { Outlet } from "react-router";
import { isDesktop } from './misc/Utils';

// import Data from './assets/TestData'

interface updateEntryResponse {
  entry: PeriodEntry
  status: "removed" | "added"
}

const App = () => {

  const [starting, setStarting] = useState(true)
  const loadFromStorage = usePeriodStore(state => state.loadFromStorage);
  const addEntry = usePeriodStore(state => state.addEntry);
  const removeEntry = usePeriodStore(state => state.removeEntry);

  useEffect(() => {
    document.title = "Raigle"
    loadFromStorage()
    setTimeout(() => {
      setStarting(false)
    }, 1000)
  }, [])

  const updateEntry = (entry: PeriodEntry): updateEntryResponse => {
    const response = { entry: JSON.parse(JSON.stringify(entry)), status: "" }
    const notesAreempty = (!entry.notes || entry.notes.length == 0 || entry.notes.replace(" ", "") == "")
    if (notesAreempty && !entry.blood) {
      // remove entry if empty
      removeEntry(entry.date)
      response.status = "removed"
    } else {
      // add or update entry
      addEntry(entry)
      response.status = "added"
    }
    return response as updateEntryResponse
  }

  return (
    <>
      {/* loading screen */}
      {<StartingSplash />}

      {/* navbar on all views once loaded */}
      {!starting &&
        <main className={`flex flex-col h-screen ${isDesktop() && "is-desktop"}`}>
          <Navbar />
          <Outlet context={updateEntry} />
        </main>
      }
    </>
  )

}
export default App