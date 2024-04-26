import { Dispatch, SetStateAction } from 'react'

export interface UploadMultipleFilesProps {
  files: File[]
  index: number
  setFiles: Dispatch<SetStateAction<Record<number, File[]>>>
}
