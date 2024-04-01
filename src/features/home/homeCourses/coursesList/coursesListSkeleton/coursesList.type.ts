import { Course } from 'types/models/Course'

export interface CoursesListProps {
  courses?: Course[]
  isLoading: boolean
}
