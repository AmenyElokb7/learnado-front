import { FooterColumn } from './Footer.type'

import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { PATHS } from '@config/constants/paths'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: 1,
    title: 'footer.for_instructors',
    items: [
      {
        id: 1,
        title: 'footer.become_instructor',
        path: `/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SIGNUP}`,
      },
      {
        id: 2,
        title: 'footer.instructor_dashboard',
        path: PATHS.INSTRUCTOR_DASHBOARD,
      },
      {
        id: 3,
        title: 'footer.instructor_support',
        path: PATHS.INSTRUCTOR_SUPPORT,
      },
    ],
  },
  {
    id: 2,
    title: 'footer.for_students',
    items: [
      {
        id: 1,
        title: 'footer.become_student',
        path: `/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SIGNUP}`,
      },
      {
        id: 2,
        title: 'footer.student_dashboard',
        path: '/student-dashboard',
      },
      {
        id: 3,
        title: 'footer.student_support',
        path: PATHS.STUDENT_SUPPORT,
      },
    ],
  },
  {
    id: 3,
    title: 'footer.news_letter',
    hasInput: true,
    items: [
      {
        id: 1,
        title: 'footer.address',
        icon: <LocationOnIcon />,
      },
      {
        id: 2,
        title: GLOBAL_VARIABLES.APP_PHONE_NUMBER,
        icon: <PhoneInTalkIcon />,
      },
      {
        id: 3,
        title: GLOBAL_VARIABLES.APP_EMAIL,
        icon: <AlternateEmailIcon />,
      },
    ],
  },
]
