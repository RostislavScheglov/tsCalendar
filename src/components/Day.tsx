import React, { useEffect, useState } from 'react'
import { Task } from './Task'

export interface Taskobject {
  taskText: string
  taskLabels: [{ labelColor: string; labelText: string }]
}

interface Props extends React.PropsWithChildren {
  tasks?: Array<Taskobject>
  dayNumber?: number
  dayIndex?: number
  setDayIndex?: (i: any) => any
}

const colorPickerPrewiev = () => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement
  const colorPreview = document.getElementById('labelText') as HTMLInputElement

  const updateColorPreview = (color: string, preview: HTMLDivElement) => {
    preview.style.backgroundColor = color
  }
  const handleColorChange = (event: Event) => {
    const selectedColor = (event.target as HTMLInputElement).value
    updateColorPreview(selectedColor, colorPreview)
  }

  colorPicker.addEventListener('input', (event) => handleColorChange(event))
}

const editTask = () => {}

export function Day({ dayNumber, dayIndex, setDayIndex, tasks }: Props) {
  const [taskState, setTaskState] = useState(tasks)

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
      onClick={() => {
        if (setDayIndex!) {
          setDayIndex(dayIndex)
          colorPickerPrewiev()
        }
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
      {dayNumber && tasks
        ? tasks.map((task, index) => (
            <Task
              taskText={task.taskText}
              taskLabels={task.taskLabels}
              taskIndex={index}
            />
          ))
        : null}
    </div>
  )
}
