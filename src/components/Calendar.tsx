/** @jsxImportSource @emotion/react */

import { Day } from './Day'
import { nagerApiCountryCodes, weekDays } from '../constants'
import { DatePicker } from './DatePicker'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { CalendarProps, HolidayObject, formattedHolidayObject } from '../type'

export function Calendar({ currentDate, setCurrentDate }: CalendarProps) {
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

  const [holidays, setHolidays] = useState<Array<formattedHolidayObject>>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchHolidays = async () => {
    try {
      const holidayDataArray = []
      for (const countryCode of nagerApiCountryCodes) {
        const response: AxiosResponse = await axios.get(
          `https://date.nager.at/api/v3/PublicHolidays/${currentDate.getFullYear()}/${countryCode}`
        )
        holidayDataArray.push(response.data)
      }
      const subHolidayArray = holidayDataArray.flat(1)
      const uniqueHolidays = new Set()
      const filteredArray = subHolidayArray.filter((obj: HolidayObject) => {
        if (!uniqueHolidays.has(obj.name) && obj.name !== undefined) {
          uniqueHolidays.add(obj.name)
          return true
        }

        return false
      })
      const formattedHolidays: Array<formattedHolidayObject> =
        filteredArray.map((el: HolidayObject) => {
          return { date: el.date.substr(-5), name: el.name }
        })
      setHolidays(formattedHolidays)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchHolidays()
  }, [currentDate])

  const days = Array.from({
    length: dayInMounth(firstDayOfMonth.getDate(), lastDayOfMonth.getDate()),
  }).map(() => {
    return <Day />
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div
      className="calendarContainer"
      css={{
        display: 'flex',
        height: '95%',
        flexDirection: 'column',
        width: '85%',
        margin: '2em auto',
      }}
    >
      <div
        className="calendarHeader"
        css={{
          width: '100%',
          marginBottom: '0.5em',
        }}
      >
        <DatePicker
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </div>
      <div
        className="calendarBody"
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          height: '100%',
          gridGap: '1.7em',
          textAlign: 'center',
        }}
      >
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="daysOfWeek"
            css={{
              alignSelf: 'end',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            {day}
          </div>
        ))}

        {Array.from({ length: prefixDay }).map((_, index) => {
          return <Day dayIndex={index} />
        })}

        {days.map((_, index) => {
          const date = index + 1
          return (
            <Day
              dayNumber={date.toString()}
              dayIndex={index}
              fullDate={currentDate}
              holidays={holidays}
            />
          )
        })}

        {Array.from({ length: sufixDay }).map((_, index) => {
          return <Day dayIndex={index} />
        })}
      </div>
    </div>
  )
}
