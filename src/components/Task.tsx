/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { TaskLabel } from './TaskLabel'
import { FieldValues, useForm } from 'react-hook-form'
import { TaskForm } from './TaskForm'
import { LabelObject, TaskProps, Taskobject } from '../type'

export function Task({ task, taskIndex }: TaskProps) {
  const [taskState, setTaskState] = useState<Taskobject>(task)
  const [editTaskModal, setEditTaskModal] = useState(false)

  const [labels, setLabels] = useState<Array<LabelObject>>(task.taskLabels)

  const editTask = (params: FieldValues) => {
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
    const tasks = document.querySelectorAll('.tasks')
    const days = document.querySelectorAll('.days')
    let selected: EventTarget | null = null
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
          day.appendChild(selected as Node)
          selected = null
        }
      })
    })
  }, [taskState])

  return (
    <div
      key={taskIndex}
      id="draggable"
      className="tasks"
      draggable="true"
      css={{
        border: '1px solid #799EE3',
        borderRadius: '6px',
        backgroundColor: 'white',
        cursor: 'drag',
        marginTop: '0.3em',
        padding: '0.4em',
        maxWidth: '17em',
        margin: 'auto',
        overflowWrap: 'anywhere',
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
            css={{
              display: 'flex',
            }}
          >
            {labels.map((label: LabelObject, index: number) => (
              <TaskLabel
                label={label}
                labels={labels}
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
              marginTop: '0.3em',
              fontSize: '17px',
              fontWeight: 'bold',
            }}
          >
            {taskState.taskText}
          </div>
        </div>
      )}
    </div>
  )
}
