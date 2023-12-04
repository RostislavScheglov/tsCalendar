/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export interface Label {
  labelText: string
  labelColor: string
}
export interface LabelObject {
  label: Label
}
interface Props {
  label: Label
  index: number
  setLabel?: () => void
  deleteLabel?: (labels: any, index: number) => void
}
export function TaskLabel({ label, index, setLabel, deleteLabel }: Props) {
  const [editLabelModal, setEditLabelModal] = useState(false)
  // const [labelState, setLabel] = useState(label)

  const setFormValues = () => {
    setValue('labelText', label.labelText)
    setValue('labelColor', label.labelColor)
  }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  return (
    <div>
      {editLabelModal ? (
        <form>
          <input
            type="color"
            id="colorPicker"
            {...register('labelColor')}
          ></input>
          <input
            type="text"
            placeholder="Edit Lable"
            id="labelText"
            {...register('labelText')}
          ></input>
          <button
            type="submit"
            onClick={() => {
              setEditLabelModal(!editLabelModal)
            }}
          >
            Edit Label
          </button>
        </form>
      ) : (
        <div
          css={{ backgroundColor: label.labelColor }}
          onClick={() => {
            setEditLabelModal(!editLabelModal)
          }}
        >
          {label.labelText}
          {/* <button onClick={() => console.log(label)}></button> */}
        </div>
      )}
    </div>
  )
}
