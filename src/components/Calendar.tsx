import { Day } from './Day'
import { weekDays } from '../constants'
import { DatePicker } from './DatePicker'

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

  const days = Array.from({
    length: dayInMounth(firstDayOfMonth.getDate(), lastDayOfMonth.getDate()),
  }).map(() => {
    return <Day />
  })

  return (
    <div
      className="calendarContainer"
      style={{
        display: 'flex',
        height: '95%',
        flexDirection: 'column',
        width: '85%',
        margin: '2em auto',
      }}
    >
      <div
        className="calendarHeader"
        style={{
          width: '100%',
          marginBottom: '0.5em',
        }}
      >
        <DatePicker
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        {/* <input
          type="text"
          placeholder="Search Task"
        ></input> */}
      </div>
      <div
        className="calendarBody"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          height: '100%',
          gridGap: '1.7em',
          textAlign: 'center',
        }}
      >
        {weekDays.map((day) => (
          <div
            className="daysOfWeek"
            style={{
              alignSelf: 'end',
            }}
          >
            {day}
          </div>
        ))}

        {Array.from({ length: prefixDay }).map(() => {
          return <Day />
        })}

        {days.map((_, index) => {
          const date = index + 1
          return (
            <Day
              dayNumber={date}
              dayIndex={index}
            />
          )
        })}

        {Array.from({ length: sufixDay }).map(() => {
          return <Day />
        })}
      </div>
    </div>
  )
}
