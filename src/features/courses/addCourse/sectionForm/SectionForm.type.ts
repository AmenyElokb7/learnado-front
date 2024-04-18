import { SetStateAction, Dispatch } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormValues } from './module/Module.type'

export interface SectionFormProps {
  sectionFormMethods: UseFormReturn<FormValues, any, undefined>
  files: Record<number, File[]>
  setFiles: Dispatch<SetStateAction<Record<number, File[]>>>
}
