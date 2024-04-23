import { UseFormReturn } from 'react-hook-form'
import { CourseForDesigner } from 'types/models/Course'

export interface CourseFormProps {
  formMethods: UseFormReturn<CourseForDesigner, any, undefined>
  isEditMode?: boolean
  defaultValues?: CourseForDesigner
}
