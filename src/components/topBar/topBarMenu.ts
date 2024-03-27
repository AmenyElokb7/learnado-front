import { PATHS } from 'config/constants/paths'

export interface Item {
  id: number
  label: string
  path: string
}

export const ItemsMain: Item[] = [
  { id: 1, label: 'topbar.Home', path: PATHS.ROOT },
  { id: 2, label: 'topbar.Courses', path: PATHS.COURSES.ROOT },
  { id: 3, label: 'topbar.Instructors', path: PATHS.INSTUCTORS },
  { id: 4, label: 'topbar.AboutUs', path: PATHS.ABOUT_US },
]
