import { TeachingTypeFilterEnum } from '@config/enums/teachingType.enum'
import { UseFormReturn } from 'react-hook-form'
import { CourseForDesigner } from 'types/models/Course'

export interface CourseFormProps {
  formMethods: UseFormReturn<CourseFormValues, any, undefined>
  isEditMode?: boolean
  defaultValues?: CourseForDesigner
}

export interface CourseFormValues {
  title: string
  description: string
  categoryId: number
  languageId: number
  isPaid: 0 | 1
  price: number
  discount: number
  facilitatorId: number
  isPublic: 0 | 1
  latitude?: number | null
  longitude?: number | null
  link?: string
  teachingType: TeachingTypeFilterEnum
  subscribers: number[]
  sequential: 0 | 1
  startTime?: string
  endTime?: string
  courseMedia?: File
}
