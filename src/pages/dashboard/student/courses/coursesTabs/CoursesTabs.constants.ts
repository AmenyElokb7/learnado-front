import { PATHS } from '@config/constants/paths'
import { CourseTabStep } from './UsersTabs.type'

export const CourseETabSteps: CourseTabStep[] = [
  {
    label: 'course.enrolled_courses',
    path: PATHS.DASHBOARD.STUDENT.MY_PROGRAM.ROOT,
    value: 0,
  },
  {
    label: 'course.completed_courses',
    path: PATHS.DASHBOARD.STUDENT.MY_PROGRAM.COMPLETED_COURSES,
    value: 1,
  },
]
