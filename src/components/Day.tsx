import React from 'react'
import { Task } from './Task'

interface Props extends React.PropsWithChildren {
  dayNumber?: number
}
export function Day(props: Props) {
  return (
    <div
      id="droppable"
      className="days"
      style={{
        width: '100%',
        height: '100%',
        // borderBottom: '1px solid #ccc',
        padding: '10px',
      }}
    >
      <div
        className="dayNumber"
        style={{
          width: 'fit-content',
          height: 'fit-content',
          // position: 'absolute',
        }}
      >
        {props?.dayNumber}
      </div>
      {/* <Task />
      <Task /> */}
    </div>
  )
}
