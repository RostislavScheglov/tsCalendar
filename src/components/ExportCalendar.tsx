/** @jsxImportSource @emotion/react */
import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { ExportComponentProps } from '../type'

const ExportComponent = ({ children }: ExportComponentProps) => {
  const componentRef = useRef<HTMLDivElement>(null)

  const handleExportClick = async () => {
    if (componentRef.current) {
      try {
        const canvas = await html2canvas(componentRef.current)
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = 'Calendar.jpg'
            link.click()
          }
        }, 'image/jpeg')
      } catch (error) {
        console.error('Error exporting component:', error)
      }
    }
  }

  return (
    <div>
      <button
        onClick={handleExportClick}
        css={{
          marginLeft: '12em',
          backgroundColor: 'transparent',
          border: '1px solid black',
          borderRadius: '6px',
          width: '12em',
          padding: '0.5em',
          cursor: 'poiner',
        }}
      >
        Export to JPEG
      </button>
      <div ref={componentRef}>{children}</div>
    </div>
  )
}

export default ExportComponent
