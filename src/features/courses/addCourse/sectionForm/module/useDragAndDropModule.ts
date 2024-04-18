import { DragEvent, useState } from 'react'

interface UseDragAndDropModuleProps {
  index: number
  onDrop: (e: DragEvent<HTMLDivElement>, index: number) => void
}
export default function useDragAndDropModule({
  index,
  onDrop,
}: UseDragAndDropModuleProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleOnDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', String(index))
    setIsDragging(true)
  }

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    onDrop(e, index)
  }
  const handleOnDragEnd = (_: DragEvent<HTMLDivElement>) => {
    setIsDragging(false)
  }

  return {
    isDragging,
    handleOnDragStart,
    handleOnDragOver,
    handleOnDrop,
    handleOnDragEnd,
  }
}
