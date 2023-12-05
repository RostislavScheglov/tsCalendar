/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { colorPickerPrewiev } from './Day'

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

  useEffect(() => {
    if (editLabelModal) {
      colorPickerPrewiev()
    }
  }, [editLabelModal])

  return (
    <div>
      {editLabelModal ? (
        <form
          id="recipeForm"
          // onSubmit={handleSubmit(editLabel)}
          onClick={(e) => e.stopPropagation()}
          className="editLabelForm"
          css={{ maxWidth: '14em', margin: 'auto', display: 'flex' }}
        >
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
            setFormValues()
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
