/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { Task } from './Task'
import { Label, LabelObject, TaskLabel } from './TaskLabel'
import { useForm } from 'react-hook-form'
import { TaskForm } from './AddTaskForm'

export interface Taskobject extends React.PropsWithChildren {
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

export function Day({ dayNumber, dayIndex }: Props) {
  const [tasksState, setTaskState]: any = useState([])
  const [labels, setLabels]: any = useState([])

  const [createTaskModal, setCreateTaskModal] = useState(false)

  const addTask = (params: any) => {
    const task = {
      taskText: params.taskText,
      taskLabels: labels,
    }
    setTaskState([...tasksState, task])
    resetField('taskText')
    setLabels([])
  }

  useEffect(() => {
    if (createTaskModal) {
      colorPickerPrewiev()
    }
  }, [createTaskModal])

  const { resetField } = useForm()

  return (
    <div
      key={dayIndex}
      id="droppable"
      className="days"
      css={{
        width: '100%',
        height: '100%',
        backgroundColor: '#d9d9d9',
        padding: '10px',
        cursor: 'pointer',
      }}
      onClick={() => {
        setCreateTaskModal(!createTaskModal)
      }}
    >
      <div
        className="dayNumber"
        css={{
          width: 'fit-content',
          height: 'fit-content',
        }}
      >
        {dayNumber}
      </div>
      {createTaskModal ? (
        <TaskForm
          submitAction={addTask}
          labels={labels}
          setLabels={setLabels}
          formTitle="Add task"
        />
      ) : null}

      {dayNumber && tasksState
        ? tasksState.map((task: Taskobject) => (
            <Task
              task={task}
              // taskIndex={index}
            />
          ))
        : null}
    </div>
  )
}
