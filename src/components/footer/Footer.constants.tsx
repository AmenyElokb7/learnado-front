import { FooterColumn } from './Footer.type'

import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { PATHS } from '@config/constants/paths'
export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: 1,
    title: 'footer.for_instructors',
    items: [
      {
        id: 1,
        title: 'footer.become_instructor',
        path: PATHS.AUTH.SIGNUP,
      },
      {
        id: 2,
        title: 'footer.instructor_dashboard',
        path: '/instructor-dashboard',
      },
      {
        id: 3,
        title: 'footer.instructor_support',
        path: '/instructor-support',
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
        path: PATHS.AUTH.SIGNUP,
      },
      {
        id: 2,
        title: 'footer.student_dashboard',
        path: '/student-dashboard',
      },
      {
        id: 3,
        title: 'footer.student_support',
        path: '/student-support',
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
        title: '+123456789',
        icon: <PhoneInTalkIcon />,
      },
      {
        id: 3,
        title: 'learnado@gmail.com',
        icon: <AlternateEmailIcon />,
      },
    ],
  },
]
