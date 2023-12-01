import React, { useEffect } from 'react'
import { Task } from './Task'

interface Props extends React.PropsWithChildren {
  tasks?: Array<string>
  dayNumber?: number
  dayIndex?: number
}

export function Day({ dayNumber, dayIndex }: Props) {
  return (
    <div
      key={dayIndex}
      id="droppable"
      className="days"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#d9d9d9',
        padding: '10px',
        cursor: 'pointer',
      }}
    >
      <div
        className="dayNumber"
        style={{
          width: 'fit-content',
          height: 'fit-content',
        }}
      >
        {dayNumber}
      </div>
      <input
        id="taskInputField"
        type="text"
        style={{
          display: 'none',
        }}
      ></input>
      {dayNumber ? <Task taskText="asfas" /> : null}
    </div>
  )
}
