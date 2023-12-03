import React, { useEffect, useState } from 'react'
import { Task } from './Task'
import { TaskLabel } from './TaskLabel'
import { useForm } from 'react-hook-form'

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
  }

  const addLabel = () => {
    const values = getValues()
    const label = {
      labelText: values.labelText,
      labelColor: values.labelColor,
    }
    setLabels([...labels, label])
    console.log(values)
    resetField('labelText')
  }

  const deleteLabel = (index: number, labels: any) => {
    setLabels(() => {
      const allLabels = [...labels]
      allLabels.splice(index, 1)
      return allLabels
    })
  }

  useEffect(() => {
    if (createTaskModal) {
      colorPickerPrewiev()
    }
  }, [createTaskModal])

  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    setError,
    setValue,
    formState: { errors },
  } = useForm()

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
        setCreateTaskModal(!createTaskModal)
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
      {createTaskModal ? (
        <div className="createTaskModal">
          <form
            id="recipeForm"
            onSubmit={handleSubmit(addTask)}
            onClick={(e) => e.stopPropagation()}
          >
            <div>Add task</div>
            <input
              type="color"
              id="colorPicker"
              {...register('labelColor')}
            ></input>
            <input
              type="text"
              placeholder="Add Lable"
              id="labelText"
              {...register('labelText')}
            ></input>
            <button
              type="button"
              onClick={() => addLabel()}
            >
              Add Label
            </button>
            <div>
              {labels.map((label: any, index: number) => (
                <div>
                  <TaskLabel
                    labelText={label.labelText}
                    labelColor={label.labelColor}
                  />
                  <div onClick={() => deleteLabel(index, labels)}>--</div>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Add Task"
              {...register('taskText', { required: 'Task Text required' })}
            ></input>

            <button
              className="submitBtn"
              type="submit"
            >
              Add Task
            </button>
          </form>
        </div>
      ) : // <CreateTaskForm
      //   addTask={addTask}
      //   addLabel={addLabel}
      //   deleteLabel={deleteLabel}
      //   labels={labels}
      // />
      null}

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
