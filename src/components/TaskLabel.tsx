/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { LabelObject, LabelTaskProps } from '../type'

export function TaskLabel({ label, labels, index, setLabel }: LabelTaskProps) {
  const [editLabelModal, setEditLabelModal] = useState(false)

  const setFormValues = () => {
    setValue('labelText', label.labelText)
    setValue('labelColor', label.labelColor)
  }
  const deleteLabel = (index: number, labels: Array<LabelObject>): void => {
    setLabel(() => {
      const allLabels = [...labels]
      allLabels.splice(index, 1)
      return allLabels
    })
  }
  const { register, handleSubmit, setValue } = useForm()
  const editLabel = (params: FieldValues): void => {
    const updatedLabels = [...labels]
    updatedLabels[index] = {
      labelText: params.labelText,
      labelColor: params.labelColor,
    }
    setLabel(updatedLabels)
    setEditLabelModal(!editLabelModal)
  }

  return (
    <div
      key={index}
      className="labelContainer"
      css={{
        display: 'flex',
        backgroundColor: 'transparent',
        borderRadius: '6px',
        marginRight: '0.5em',
        marginTop: '0.3em',
      }}
    >
      {editLabelModal ? (
        <form
          onClick={(e) => e.stopPropagation()}
          className="editLabelForm"
          css={{ maxWidth: '14em', margin: 'auto', display: 'flex' }}
        >
          <input
            type="color"
            id="colorPicker"
            css={{
              border: 'none',
              backgroundColor: 'transparent',
              width: '20%',
            }}
            {...register('labelColor')}
          ></input>
          <input
            type="text"
            placeholder="Edit Lable"
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
            onClick={handleSubmit(editLabel)}
            css={{
              padding: '0.5em',
              backgroundColor: '#FFFFFF',
              color: '#F6F8F9',
              borderRadius: '4px',
              border: '1px solid transparent',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            <svg
              height="13px"
              width="13px"
              viewBox="0 0 259.465 259.465"
            >
              <g>
                <path
                  d="M190.239,0l-38.46,38.46L43.276,146.969L0.003,259.465l112.496-43.268l116.195-116.195l0,0  
                 l30.769-30.769L190.239,0z M18.947,240.521l9.692-25.21l15.512,15.512L18.947,240.521z M106.44,206.869l-51.182,19.684  
                  l-22.349-22.349l17.09-44.448l24.851,24.851l7.691-7.691l-26.923-26.923l73.079-73.074l19.227,19.233l7.691-7.691l-19.227-19.233   
                  l7.691-7.691l19.233,19.233l7.691-7.691l-19.227-19.233l7.691-7.691l34.614,34.614l-96.146,96.152l7.691,7.691l96.152-96.152   
                  l11.536,11.536L106.44,206.869z M221.003,92.306l-53.841-53.841l23.078-23.078l53.841,53.841L221.003,92.306z"
                />
              </g>
            </svg>
          </button>
          <div
            css={{
              alignItems: 'center',
            }}
          >
            <svg
              onClick={() => deleteLabel(index, labels)}
              width="26px"
              height="26px"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4.7002 4.70018L11.2999 11.2998"
                stroke="#6F6F6F"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.7002 11.2998L11.2999 4.70016"
                stroke="#6F6F6F"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </form>
      ) : (
        <div
          css={{
            backgroundColor: label.labelColor,
            padding: '0.2em',
            borderRadius: '4px',
            marginRight: '0.5em',
          }}
          onClick={() => {
            setFormValues()
            setEditLabelModal(!editLabelModal)
          }}
        >
          {label.labelText}
        </div>
      )}
    </div>
  )
}
