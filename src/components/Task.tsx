import { useEffect } from 'react'
import { Taskobject } from './Day'
import { TaskLabel } from './TaskLabel'

interface TaskProps extends Taskobject {
  taskIndex: number
}
export function Task({ taskText, taskLabels, taskIndex }: TaskProps) {
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
  }, [taskText])

  return (
    <div
      id="draggable"
      className="tasks"
      draggable="true"
      style={{
        border: '1px solid black',
        borderRadius: '6px',
        backgroundColor: 'white',
        cursor: 'drag',
        width: '100%',
        marginTop: '0.3em',
      }}
    >
      <div>
        {taskLabels.map((label: any) => (
          <TaskLabel
            labelText={label.labelText}
            labelColor={label.labelColor}
          />
        ))}
      </div>
      <div
        style={{
          width: 'fit-content',
          height: 'fit-content',
        }}
      >
        {taskText}
      </div>
    </div>
  )
}
