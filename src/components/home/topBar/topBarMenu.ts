import { PATHS } from 'config/constants/paths'

interface Item {
  name: string
  path: string | (typeof PATHS)[keyof typeof PATHS]
}
export interface ItemsType {
  [key: string]: Item
}
export const ItemsMain = {
  home: { name: 'TOPBAR.Home', path: PATHS.ROOT },
  courses: { name: 'TOPBAR.Courses', path: PATHS.COURSES.ROOT },
  instructors: { name: 'TOPBAR.Instructors', path: PATHS.INSTUCTORS },
  aboutUs: { name: 'TOPBAR.AboutUs', path: PATHS.ABOUT_US },
}
