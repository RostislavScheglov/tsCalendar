interface Props {
  labelText: string
  labelColor: string
}

export function TaskLabel({ labelText, labelColor }: Props) {
  return <div style={{ backgroundColor: labelColor }}>{labelText}</div>
}
