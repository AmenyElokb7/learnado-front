import { SetStateAction, Dispatch } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormValues } from './module/Module.type'
import { CourseForDesigner } from 'types/models/Course'

export interface SectionFormProps {
  sectionFormMethods: UseFormReturn<FormValues, any, undefined>
  files: Record<number, File[]>
  isEditMode?: boolean
  defaultValues?: CourseForDesigner
  isFetching?: boolean
  setFiles: Dispatch<SetStateAction<Record<number, File[]>>>
  handleAddSection?: () => void
}

export interface ExtendedFile extends File {
  id: number
}
