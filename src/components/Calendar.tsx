import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Day, Taskobject } from './Day'
import { weekDays } from '../constants'
import { DatePicker } from './DatePicker'
import { TaskLabel } from './TaskLabel'

interface Props {
  currentDate: Date
  setCurrentDate: (value: Date) => void
}

export function Calendar({ currentDate, setCurrentDate }: Props) {
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )

  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  )

  const prefixDay: number = firstDayOfMonth.getDay()
  const sufixDay: number = 6 - lastDayOfMonth.getDay()

  const dayInMounth = (
    firstDayOfMonth: number,
    lastDayOfMonth: number
  ): number => {
    return lastDayOfMonth - firstDayOfMonth + 1
  }

  const [days, setDays] = useState(
    Array.from({
      length: dayInMounth(firstDayOfMonth.getDate(), lastDayOfMonth.getDate()),
    }).map(() => {
      return <Day tasks={[]} />
    })
  )

  const [dayIndex, setDayIndex] = useState(0)

  const [labels, setLabels]: any = useState([])

  const addLabel = () => {
    const values = getValues()
    const label = {
      labelText: values.labelText,
      labelColor: values.labelColor,
    }
    setLabels([...labels, label])
    resetField('labelText')
  }

  const deleteLabel = (index: number, labels: any) => {
    setLabels(() => {
      const allLabels = [...labels]
      allLabels.splice(index, 1)
      return allLabels
    })
  }

  const addTask = (params: any) => {
    const updatedDays = [...days]
    updatedDays[dayIndex].props.tasks.push({
      taskText: params.taskText,
      taskLabels: labels,
    })
    setDays(updatedDays)
    resetField('taskText')
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

  return (
    <div
      className="calendarContainer"
      style={{
        display: 'flex',
        height: '95%',
        flexDirection: 'column',
        width: '85%',
        margin: '2em auto',
      }}
    >
      <div
        className="calendarHeader"
        style={{
          width: '100%',
          marginBottom: '0.5em',
        }}
      >
        <DatePicker
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        {/* <input
          type="text"
          placeholder="Search Task"
        ></input> */}
      </div>
      <div
        className="calendarBody"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          height: '100%',
          gridGap: '1.7em',
          textAlign: 'center',
        }}
      >
        {weekDays.map((day) => (
          <div
            className="daysOfWeek"
            style={{
              alignSelf: 'end',
            }}
          >
            {day}
          </div>
        ))}
        <form
          id="recipeForm"
          onSubmit={handleSubmit(addTask)}
        >
          <input
            type="text"
            placeholder="Add Task"
            {...register('taskText', { required: 'Task Text required' })}
          ></input>
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
          <button
            className="submitBtn"
            type="submit"
          >
            Add Task
          </button>
        </form>
        {Array.from({ length: prefixDay }).map(() => {
          return <Day />
        })}

        {days.map((day, index) => {
          const date = index + 1
          return (
            <Day
              dayNumber={date}
              dayIndex={index}
              setDayIndex={setDayIndex}
              tasks={day.props.tasks}
            />
          )
        })}

        {Array.from({ length: sufixDay }).map(() => {
          return <Day />
        })}
      </div>
    </div>
  )
}
