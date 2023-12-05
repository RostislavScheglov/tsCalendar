import React, { useRef } from 'react'
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
      <div ref={componentRef}>{children}</div>
      <button onClick={handleExportClick}>Export to JPEG</button>
    </div>
  )
}

export default ExportComponent
