import React, { useEffect, useState } from 'react'
import { Task } from './Task'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TaskLabel } from './TaskLabel'

export interface Taskobject {
  taskText: string
  taskLabels: [{ labelColor: string; labelText: string }]
}

interface Props extends React.PropsWithChildren {
  addTask: SubmitHandler<FieldValues>
  addLabel: () => void
  deleteLabel: (index: number, labels: any) => void
  labels: any
}
console.log()
export function CreateTaskForm({
  addTask,
  addLabel,
  deleteLabel,
  labels,
}: Props) {
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
    <div className="createTaskModal">
      <form
        id="recipeForm"
        onSubmit={handleSubmit(addTask)}
        onClick={(e) => e.stopPropagation()}
      >
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
          //   onClick={() => addLabel(getValues())}
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
  )
}
