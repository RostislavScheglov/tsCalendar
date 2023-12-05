import { useState } from 'react'
import { Calendar } from './components/Calendar'
import ExportComponent from './components/ExportCalendar'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  return (
    <ExportComponent
      children={
        <div
          className="App"
          style={{ height: '60vw' }}
        >
          <Calendar
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        </div>
      }
    />
  )
}

export default App
