import { UseFormReturn } from 'react-hook-form'
import { CourseForDesigner } from 'types/models/Course'

export interface CourseFormProps {
  formMethods: UseFormReturn
  isEditMode?: boolean
  defaultValues?: CourseForDesigner
}
