import { PATHS } from '@config/constants/paths'
import { ElementType } from 'react'
import { UserRoleEnum } from '@config/enums/role.enum'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
export interface SidebarItem {
  id: number
  label: string
  path: string
  icon: ElementType
  accessibleRoles?: UserRoleEnum[]
}

export const ItemsSidebar: SidebarItem[] = [
  {
    id: 1,
    label: 'sidebar.dashboard',
    path: PATHS.DASHBOARD.ROOT,
    icon: DashboardOutlinedIcon,
    accessibleRoles: [
      UserRoleEnum.USER,
      UserRoleEnum.FACILITATOR,
      UserRoleEnum.ADMIN,
      UserRoleEnum.DESIGNER,
    ],
  },
  {
    id: 2,
    label: 'sidebar.profile',
    path: PATHS.DASHBOARD.PROFILE.ROOT,
    icon: PersonOutlineOutlinedIcon,
    accessibleRoles: [
      UserRoleEnum.USER,
      UserRoleEnum.FACILITATOR,
      UserRoleEnum.ADMIN,
      UserRoleEnum.DESIGNER,
    ],
  },
  {
    id: 3,
    label: 'sidebar.enrolled_courses',
    path: PATHS.DASHBOARD.STUDENT.MY_PROGRAM,
    icon: SchoolOutlinedIcon,
    accessibleRoles: [UserRoleEnum.USER],
  },
  {
    id: 4,
    label: 'sidebar.my_quiz',
    path: PATHS.DASHBOARD.STUDENT.MY_QUIZZES,
    icon: QuizOutlinedIcon,
    accessibleRoles: [UserRoleEnum.USER],
  },
  {
    id: 5,
    label: 'sidebar.my_certificates',
    path: PATHS.DASHBOARD.STUDENT.MY_CERTIFICATES,
    icon: WorkspacePremiumOutlinedIcon,
    accessibleRoles: [UserRoleEnum.USER],
  },
  {
    id: 6,
    label: 'sidebar.my_calendar',
    path: PATHS.DASHBOARD.STUDENT.MY_CALENDAR,
    icon: CalendarMonthOutlinedIcon,
    accessibleRoles: [UserRoleEnum.USER, UserRoleEnum.FACILITATOR],
  },
]
