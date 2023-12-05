/** @jsxImportSource @emotion/react */

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TaskLabel } from './TaskLabel'
import { LabelObject, TaskFormProps } from '../type'
export function TaskForm({
  submitAction,
  setLabels,
  labels,
  taskText,
}: TaskFormProps) {
  const { register, handleSubmit, getValues, resetField, setValue } = useForm()

  const setFormValues = () => {
    setValue('taskText', taskText)
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
    resetField('labelText')
  }

  return (
    <form
      onSubmit={handleSubmit(submitAction)}
      onClick={(e) => e.stopPropagation()}
      className="createTaskForm"
      css={{
        margin: 'auto',
        backgroundColor: '#FFFFFF',
        borderRadius: '6px',
      }}
    >
      <div
        className="addLabels"
        onClick={(e) => {
          e.stopPropagation()
        }}
        css={{
          display: 'flex',
          margin: '0.3em 0',
          justifyContent: 'space-between',
        }}
      >
        <input
          type="color"
          id="colorPicker"
          {...register('labelColor')}
          css={{
            border: 'none',
            backgroundColor: 'transparent',
            width: '20%',
          }}
        ></input>
        <input
          type="text"
          placeholder="Add Lable"
          id="labelText"
          css={{
            border: 'none',
            backgroundColor: 'transparent',
            width: '40%',
            marginRight: 'auto',
            outline: 'none',
          }}
          {...register('labelText')}
        ></input>
        <button
          type="button"
          onClick={() => addLabel()}
          css={{
            padding: '0.5em',
            backgroundColor: 'transparent',
            border: '1px solid #D0D5DD',
            borderRadius: '4px',
            fontSize: '12px',
          }}
        >
          +Add label
        </button>
      </div>
      <div
        className="labelsContainer"
        css={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}
      >
        {labels.map((label: LabelObject, index: number) => (
          <TaskLabel
            label={label}
            labels={labels}
            index={index}
            setLabel={setLabels}
          />
        ))}
      </div>
      <div
        className="taskContainer"
        css={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <input
          type="text"
          placeholder="Add Task"
          {...register('taskText', { required: 'Task Text required' })}
          css={{
            border: 'none',
            backgroundColor: 'transparent',
            outline: 'none',
            maxWidth: '10em',
          }}
        ></input>

        <button
          className="submitBtn"
          type="submit"
          css={{
            padding: '0.5em',
            backgroundColor: '#1458DD',
            color: '#F6F8F9',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        >
          Save
        </button>
      </div>
    </form>
  )
}
