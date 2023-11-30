import { useEffect } from 'react'
import { Day } from './Day'
import { weekDays } from '../constants'
import { DatePicker } from './datePicker'

interface Props {
  currentDate: Date
  setCurrentDate: (value: Date) => void
}

export function Calendar({ currentDate, setCurrentDate }: Props) {
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )

  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  )

  const prefixDay: number = firstDayOfMonth.getDay()
  const sufixDay: number = 6 - lastDayOfMonth.getDay()

  const dayInMounth = (
    firstDayOfMonth: number,
    lastDayOfMonth: number
  ): number => {
    return lastDayOfMonth - firstDayOfMonth + 1
  }

  useEffect(() => {
    const tasks = document.querySelectorAll('.tasks')
    const days = document.querySelectorAll('.days')
    let selected: any
    tasks.forEach((task) => {
      task.addEventListener('dragstart', function (e) {
        selected = e.target
      })
    })

    days.forEach((day) => {
      day.addEventListener('dragover', function (e) {
        e.preventDefault()
        day.addEventListener('drop', function (e) {
          console.log('droped', selected)
          day.appendChild(selected)
        })
      })
    })
  }, [])

  return (
    <div
      className="calendarContainer"
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <div
        className="calendarHeader"
        style={{
          width: '100%',
        }}
      >
        <DatePicker
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <input
          type="text"
          placeholder="Search Task"
        ></input>
      </div>
      <div
        className="calendarBody"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
        }}
      >
        {weekDays.map((day) => (
          <div className="daysOfWeek">{day}</div>
        ))}

        {Array.from({ length: prefixDay }).map(() => {
          return <Day />
        })}

        {Array.from({
          length: dayInMounth(
            firstDayOfMonth.getDate(),
            lastDayOfMonth.getDate()
          ),
        }).map((_, index) => {
          const date = index + 1
          return <Day dayNumber={date} />
        })}
        {Array.from({ length: sufixDay }).map(() => {
          return <Day />
        })}
      </div>
    </div>
  )
}
