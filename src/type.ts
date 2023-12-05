import { FieldValues, SubmitHandler } from 'react-hook-form'

export interface LabelObject {
  labelText: string
  labelColor: string
}

export interface Taskobject extends React.PropsWithChildren {
  taskText: string
  taskLabels: Array<LabelObject>
}
export interface TaskFormParams {
  taskText: string
  labelText: string
  labelColor: string
}

export interface TaskProps extends React.PropsWithChildren {
  task: Taskobject
  taskIndex: number
}
export interface LabelTaskProps {
  label: LabelObject
  labels: Array<LabelObject>
  index: number
  setLabel?: any
  deleteLabel?: (index: number) => void
}
export interface TaskFormProps extends React.PropsWithChildren {
  formTitle: string
  submitAction: SubmitHandler<FieldValues>
  setLabels: (e: any) => void
  labels: Array<LabelObject>
  taskText?: string
}
export interface DatePickerProps {
  currentDate: Date
  setCurrentDate: (value: Date) => void
}
export interface DayProps extends React.PropsWithChildren {
  tasks?: Array<Taskobject>
  dayNumber?: string
  dayIndex?: number
  holidays?: Array<formattedHolidayObject>
  fullDate?: Date
}
export interface HolidayObject {
  counties: null
  countryCode: string
  date: string
  fixed: boolean
  global: boolean
  launchYear: null | string
  localName: string
  name: string
  types: [string]
}
export interface formattedHolidayObject {
  date: string
  name: string
}
export interface CalendarProps {
  currentDate: Date
  setCurrentDate: (value: Date) => void
}
export interface CalendarProps {
  currentDate: Date
  setCurrentDate: (value: Date) => void
}
export interface ExportComponentProps {
  children: React.ReactNode
}
