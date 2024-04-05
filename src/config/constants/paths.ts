export const PATHS = {
  ROOT: '/',

  COURSES: {
    ROOT: '/Courses',
    COURSES_DETAIL: '/courses/:courseId',
  },

  LEARNING_PATH: {
    ROOT: '/learning-path',
  },

  CATEGORIES: {
    ROOT: '/categories',
  },

  INSTRUCTORS: '/Instructors',

  ABOUT_US: '/AboutUs',
  AUTH: {
    ROOT: 'auth',
    LOGIN: 'login',
    SIGNUP: 'signup',
    FORGET_PASSWORD: 'forget-password',
    RESET_PASSWORD: 'reset-password',
  },

  DASHBOARD: {
    ROOT: '/dashboard',
    ADMIN: {
      ROOT: '/dashboard/admin',
      STUDENTS: '/dashboard/admin/students',
      DESIGNERS: '/dashboard/admin/designers',
      FACILITATORS: '/dashboard/admin/facilitators',
      POSTS: '/dashboard/admin/posts',
      EDIT_USER: '/dashboard/admin/users/:id',
      ADD_USER: '/dashboard/admin/add',
    },
  },
  INSTRUCTOR_DASHBOARD: '/instructor-dashboard',
  INSTRUCTOR_SUPPORT: '/instructor-support',
  STUDENT_DASHBOARD: '/student-dashboard',
  STUDENT_SUPPORT: '/student-support',
  PROFILE: '/profile',
  MY_PROGRAM: '/my-program',

  MAIN: {
    HOME: '',
    ERROR: {
      P_500: '/500',
      P_404: '/404',
      P_403: '/403',
    },
  },
  ANY: '*',
}
