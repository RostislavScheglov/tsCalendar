interface Props {
  currentDate: Date
  setCurrentDate: (value: Date) => void
}

export function DatePicker({ currentDate, setCurrentDate }: Props) {
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
  }
  const prevYear = () => {
    setCurrentDate(
      new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
    )
  }

  const nextYear = () => {
    setCurrentDate(
      new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))
    )
  }
  const monthName = currentDate.toLocaleDateString(undefined, { month: 'long' })
  const year = currentDate.getFullYear()
  return (
    <div
      className="datePickerContainer"
      style={{
        width: 'fit-content',
        display: 'flex',
        margin: 'auto',
      }}
    >
      <button onClick={prevYear}>{'<<'}</button>
      <button onClick={prevMonth}>{'<'}</button>
      <div
        style={{
          margin: 'auto',
        }}
      >
        {monthName} {year}
      </div>
      <button onClick={nextMonth}>{'>'}</button>
      <button onClick={nextYear}>{'>>'}</button>
    </div>
  )
}
