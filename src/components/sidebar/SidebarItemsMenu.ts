import { PATHS } from '@config/constants/paths'
import { ElementType } from 'react'
import { UserRoleEnum } from '@config/enums/role.enum'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined'
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
  {
    id: 7,
    label: 'sidebar.users',
    path: PATHS.DASHBOARD.ADMIN.USERS.ALL,
    icon: ManageAccountsOutlinedIcon,
    accessibleRoles: [UserRoleEnum.ADMIN],
  },
  {
    id: 8,
    label: 'sidebar.language',
    path: PATHS.DASHBOARD.ADMIN.LANGUAGE,
    icon: TranslateOutlinedIcon,
    accessibleRoles: [UserRoleEnum.ADMIN],
  },
  {
    id: 9,
    label: 'sidebar.category',
    path: PATHS.DASHBOARD.ADMIN.CATEGORY,
    icon: CategoryOutlinedIcon,
    accessibleRoles: [UserRoleEnum.ADMIN],
  },
  {
    id: 10,
    label: 'sidebar.courses',
    path: PATHS.DASHBOARD.DESIGNER.MY_COURSES.ROOT,
    icon: RocketLaunchOutlinedIcon,
    accessibleRoles: [UserRoleEnum.DESIGNER],
  },
  {
    id: 11,
    label: 'sidebar.learning_path',
    path: PATHS.DASHBOARD.DESIGNER.MY_LEARNING_PATHS,
    icon: RouteOutlinedIcon,
    accessibleRoles: [UserRoleEnum.DESIGNER],
  },
]
