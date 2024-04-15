import { ChangeEvent, MouseEvent } from 'react'

export interface UploadInputProps {
  preview: string | null
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onDelete: (event: MouseEvent<SVGSVGElement>) => void
}
