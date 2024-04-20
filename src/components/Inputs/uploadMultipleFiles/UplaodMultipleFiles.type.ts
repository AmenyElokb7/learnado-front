import { Dispatch, SetStateAction } from 'react'

export interface UploadMultipleFilesProps {
  files: File[]
  index: number
  isEditMode?: boolean
  setFiles: Dispatch<SetStateAction<Record<number, File[]>>>
}
