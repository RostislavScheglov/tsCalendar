/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { Label, TaskLabel } from './TaskLabel'
import { useForm } from 'react-hook-form'
import { TaskForm } from './AddTaskForm'
import { colorPickerPrewiev } from './Day'

export function Task({ task }: any) {
  const [taskState, setTaskState] = useState(task)
  const [editTaskModal, setEditTaskModal] = useState(false)

  const [labels, setLabels]: any = useState(task.taskLabels)

  const editTask = (params: any) => {
    setTaskState({ taskText: params.taskText, taskLabels: labels })
    resetField('taskText')
    setEditTaskModal(!editTaskModal)
  }

  const deleteLabel = (index: number) => {
    setLabels(() => {
      const allLabels = [...labels]
      allLabels.splice(index, 1)
      return allLabels
    })
  }
  const { resetField } = useForm()

  useEffect(() => {
    if (editTaskModal) {
      colorPickerPrewiev()
    }
  }, [editTaskModal])

  useEffect(() => {
    const tasks = document.querySelectorAll('.tasks')
    const days = document.querySelectorAll('.days')
    let selected: any = null
    tasks.forEach((task) => {
      task.addEventListener('dragstart', function (e) {
        selected = e.target
      })
    })
    days.forEach((day) => {
      day.addEventListener('dragover', function (e) {
        e.preventDefault()
      })
      day.addEventListener('drop', function (e) {
        e.preventDefault()
        if (selected) {
          day.appendChild(selected)
          selected = null
        }
      })
    })
  }, [taskState])

  return (
    <div
      id="draggable"
      className="tasks"
      draggable="true"
      css={{
        border: '1px solid black',
        borderRadius: '6px',
        backgroundColor: 'white',
        cursor: 'drag',
        marginTop: '0.3em',
        padding: '0.4em',
        maxWidth: '14em',
        margin: 'auto',
      }}
      onClick={(e) => {
        e.stopPropagation()
        setEditTaskModal(!editTaskModal)
      }}
    >
      {editTaskModal ? (
        <TaskForm
          submitAction={editTask}
          labels={labels}
          setLabels={setLabels}
          formTitle="Edit task"
          taskText={taskState.taskText}
        />
      ) : (
        <div className="taskBody">
          <div
            className="taskLabels"
            css={{ display: 'flex', justifyContent: 'space-around' }}
          >
            {labels.map((label: Label, index: number) => (
              <TaskLabel
                label={label}
                setLabel={setLabels}
                index={index}
                deleteLabel={deleteLabel}
              />
            ))}
          </div>
          <div
            className="taskText"
            css={{
              width: 'fit-content',
              height: 'fit-content',
            }}
          >
            {taskState.taskText}
          </div>
        </div>
      )}
    </div>
  )
}
