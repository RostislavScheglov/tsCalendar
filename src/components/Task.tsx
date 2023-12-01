interface Props extends React.PropsWithChildren {
  taskText?: string
  taskLabel?: string
}

export function Task({ taskText, taskLabel }: Props) {
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
    >
      <div>{taskLabel}</div>
      <div>{taskText}</div>
    </div>
  )
}
