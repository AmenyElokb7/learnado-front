import { ChangeEvent, MouseEvent } from 'react'

export interface UploadInputProps {
  preview: string | null
  label?: string
  file?: File

  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onDelete: (event: MouseEvent<SVGSVGElement>, index?: number) => void
  multiple?: boolean
}
