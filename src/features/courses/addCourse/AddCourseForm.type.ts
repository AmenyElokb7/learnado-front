import { CourseForDesigner } from 'types/models/Course'

export interface AddCourseFormProps {
  isEditMode: boolean
  courseDefaultValues?: CourseForDesigner
  id?: string
  isFetching?: boolean
}
