import { useEffect, useState } from 'react'
import { Taskobject } from './Day'
import { TaskLabel } from './TaskLabel'
import { useForm } from 'react-hook-form'

export function Task({ task }: any) {
  const [taskState, setTaskState] = useState(task)
  const [editTaskModal, setEditTaskModal] = useState(false)
  const [labels, setLabels]: any = useState(task.taskLabels)

  const addTask = (params: any) => {
    // const task = {
    //   taskText: params.taskText,
    //   taskLabels: labels,
    // }
    // setTaskState([...tasksState, task])
    // resetField('taskText')
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
  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    setError,
    setValue,
    formState: { errors },
  } = useForm()

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
      style={{
        border: '1px solid black',
        borderRadius: '6px',
        backgroundColor: 'white',
        cursor: 'drag',
        width: '100%',
        marginTop: '0.3em',
      }}
      onClick={(e) => {
        e.stopPropagation()
        setEditTaskModal(!editTaskModal)
      }}
    >
      {editTaskModal ? (
        <div
          className="createTaskModal"
          onClick={(e) => {
            e.stopPropagation()
            setEditTaskModal(!editTaskModal)
          }}
        >
          <form
            id="recipeForm"
            onSubmit={handleSubmit(addTask)}
            onClick={(e) => e.stopPropagation()}
          >
            <div>Edit task</div>
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
      ) : (
        // <CreateTaskForm
        //   addTask={addTask}
        //   addLabel={addLabel}
        //   deleteLabel={deleteLabel}
        //   labels={labels}
        // />
        <div>
          <div>
            {taskState.taskLabels.map((label: any) => (
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
            {taskState.taskText}
          </div>
        </div>
      )}
      {/* <div>
        <div>
          {taskState.taskLabels.map((label: any) => (
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
          {taskState.taskText}
        </div>
      </div> */}
    </div>
  )
}
