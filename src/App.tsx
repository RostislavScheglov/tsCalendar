import React, { useState } from 'react'
import { Calendar } from './components/Calendar'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  return (
    <div
      className="App"
      style={{ height: '100vh' }}
    >
      <Calendar
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
    </div>
  )
}

export default App
