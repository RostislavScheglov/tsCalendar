export function Task() {
  return (
    <div
      id="draggable"
      className="tasks"
      draggable="true"
      style={{
        border: '1px solid black',
        cursor: 'drag',
      }}
    >
      <p>Label</p>
      <div>Task</div>
    </div>
  )
}
