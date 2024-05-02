import { Course } from 'types/models/Course'

export interface AllCoursesListProps {
  courses?: Course[]
  isLoading: boolean
  isDesigner?: boolean
  isInstructor?: boolean
}
