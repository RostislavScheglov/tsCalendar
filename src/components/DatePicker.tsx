/** @jsxImportSource @emotion/react */
import { DatePickerProps } from '../type'

export function DatePicker({ currentDate, setCurrentDate }: DatePickerProps) {
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
  const cssButtons = {
    backgroundColor: 'transparent',
    width: '3em',
    height: '3em',
    border: '1px solid black',
    borderRadius: '6px',
    margin: '0 0.5em',
  }
  return (
    <div
      className="datePickerContainer"
      style={{
        width: 'fit-content',
        display: 'flex',
        margin: 'auto',
      }}
    >
      <button
        css={cssButtons}
        onClick={prevYear}
      >
        {'<<'}
      </button>
      <button
        css={cssButtons}
        onClick={prevMonth}
      >
        {'<'}
      </button>
      <div css={{ margin: 'auto', fontWeight: 'bold', fontSize: '25px' }}>
        {monthName} {year}
      </div>
      <button
        css={cssButtons}
        onClick={nextMonth}
      >
        {'>'}
      </button>
      <button
        css={cssButtons}
        onClick={nextYear}
      >
        {'>>'}
      </button>
    </div>
  )
}
