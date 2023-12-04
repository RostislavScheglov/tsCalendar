/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from 'react'
import { Task } from './Task'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Label, TaskLabel } from './TaskLabel'

export interface Taskobject {
  taskText: string
  taskLabels: [{ labelColor: string; labelText: string }]
}

interface Props extends React.PropsWithChildren {
  formTitle: string
  submitAction: SubmitHandler<FieldValues>
  setLabels: (e: any) => void
  // deleteLabel: (index: number, labels: any) => void
  labels: any
  taskText?: string
}

export function TaskForm({
  submitAction,
  setLabels,
  // deleteLabel,
  labels,
  formTitle,
  taskText,
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

  const setFormValues = () => {
    setValue('taskText', taskText)
  }

  const deleteLabel = (index: number, labels: any): any => {
    setLabels(() => {
      const allLabels = [...labels]
      allLabels.splice(index, 1)
      return allLabels
    })
  }

  useEffect(() => {
    setFormValues()
  }, [taskText])

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

  return (
    <form
      id="recipeForm"
      onSubmit={handleSubmit(submitAction)}
      onClick={(e) => e.stopPropagation()}
      className="createTaskForm"
      css={{ maxWidth: '14em', margin: 'auto' }}
    >
      <div>{formTitle}</div>
      <div
        className="addLabels"
        onClick={(e) => {
          e.stopPropagation()
        }}
        css={{ display: 'flex' }}
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
          onClick={() => addLabel()}
        >
          Add Label
        </button>
      </div>
      <div
        className="labelsContainer"
        css={{ display: 'flex', width: 'fit-content' }}
      >
        {labels.map((label: Label, index: number) => (
          <div
            className="labelContainer"
            css={{ display: 'flex', width: 'fit-content' }}
          >
            <TaskLabel
              label={label}
              index={index}
              // labelText={label.labelText}
              // labelColor={label.labelColor}
            />
            <div onClick={() => deleteLabel(index, labels)}>-</div>
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
        Save
      </button>
    </form>
  )
}
