/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { Task } from './Task'
import { FieldValues, useForm } from 'react-hook-form'
import { TaskForm } from './TaskForm'
import {
  DayProps,
  LabelObject,
  Taskobject,
  formattedHolidayObject,
} from '../type'

export function Day({ dayNumber, dayIndex, fullDate, holidays }: DayProps) {
  const [tasksState, setTaskState] = useState<Array<Taskobject>>([])
  const [labels, setLabels] = useState<Array<LabelObject>>([])
  const [createTaskModal, setCreateTaskModal] = useState(false)

  const addTask = (params: FieldValues) => {
    const task: Taskobject = {
      taskText: params.taskText,
      taskLabels: labels,
    }
    setTaskState([...tasksState, task])
    resetField('taskText')
    setLabels([])
    setCreateTaskModal(!createTaskModal)
  }
  let checkDate: string | undefined = undefined

  const { resetField } = useForm()

  if (holidays && dayNumber && fullDate) {
    const day = dayNumber.padStart(2, '0')
    const month = 1 + fullDate.getMonth()
    const formattedMonth = month.toString().padStart(2, '0')
    checkDate = formattedMonth + '-' + day
  }
  return (
    <div
      key={dayIndex}
      id="droppable"
      className="days"
      css={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F5F7F9',
        padding: '10px',
        cursor: 'pointer',
        borderRadius: '4px',
      }}
      onClick={() => {
        if (dayNumber) setCreateTaskModal(!createTaskModal)
      }}
    >
      <div
        className="dayNumber"
        css={{
          width: 'fit-content',
          height: 'fit-content',
          fontWeight: 'bold',
          fontSize: '18px',
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
        ? tasksState.map((task: Taskobject, index) => (
            <Task
              task={task}
              taskIndex={index}
            />
          ))
        : null}
      {checkDate && holidays
        ? holidays.map((el: formattedHolidayObject, index) => {
            if (el.date === checkDate) {
              return (
                <div
                  key={index}
                  css={{
                    margin: '0.5em 0',
                  }}
                >
                  {el.name}
                </div>
              )
            }
          })
        : null}
    </div>
  )
}
