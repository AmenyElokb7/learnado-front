import { PATHS } from '@config/constants/paths'

export interface Item {
  id: number
  label: string
  path: string
}

export const ItemsMain: Item[] = [
  { id: 1, label: 'topbar.home', path: PATHS.ROOT },
  { id: 2, label: 'topbar.courses', path: PATHS.COURSES.ROOT },
  { id: 3, label: 'topbar.instructors', path: PATHS.INSTRUCTORS },
  { id: 4, label: 'topbar.learning_path', path: PATHS.LEARNING_PATH.ROOT },
  { id: 5, label: 'topbar.about_us', path: PATHS.ABOUT_US },
]
export const ItemsAuth: Item[] = [
  { id: 1, label: 'topbar.profile', path: PATHS.PROFILE },
  { id: 2, label: 'topbar.my_program', path: PATHS.MY_PROGRAM },
  { id: 3, label: 'topbar.student_dashboard', path: PATHS.STUDENT_DASHBOARD },
]
