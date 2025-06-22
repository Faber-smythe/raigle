import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import 'react-calendar/dist/Calendar.css';
import App from './App'
import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import DayView from './components/views/DayView'
import WeekView from './components/views/WeekView'
import MonthView from './components/views/MonthView'
import { registerSW } from 'virtual:pwa-register'

registerSW({
  onNeedRefresh() {
    // optional: show a "refresh" button
  },
  onOfflineReady() {
    console.log('App is ready to work offline')
  }
})

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} >
          {/* default route */}
          <Route index element={<Navigate to="/day" />} />
          {/* routes */}
          <Route path="day/:dayParam" element={<DayView />} />
          <Route path="day" element={<DayView />} />
          <Route path="week/:dayParam" element={<WeekView />} />
          <Route path="week" element={<WeekView />} />
          <Route path="month/:dayParam" element={<MonthView />} />
          <Route path="month" element={<MonthView />} />
        </Route>
      </Routes>
      {/* <App /> */}
    </StrictMode>
  </BrowserRouter>
)
