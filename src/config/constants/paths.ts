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
    PROFILE: {
      ROOT: '/dashboard/profile',
      SETTINGS: '/dashboard/profile/settings',
    },
    ADMIN: {
      ROOT: '/dashboard/admin',
      USERS: '/dashboard/admin/users',
      CATEGORY: '/dashboard/admin/categories',
      LANGUAGE: '/dashboard/admin/languages',
      PENDING_USERS: '/dashboard/admin/pendingUsers',
      POSTS: '/dashboard/admin/posts',
      EDIT_USER: '/dashboard/admin/users/:id',
      ADD_USER: '/dashboard/admin/add',
    },
    STUDENT: {
      ROOT: '/dashboard/student',
      MY_PROGRAM: '/dashboard/student/my-program',
      MY_CERTIFICATES: '/dashboard/student/my-certificates',
      MY_QUIZZES: '/dashboard/student/my-quizzes',
      MY_CALENDAR: '/dashboard/student/my-calendar',
      MY_SUPPORT: '/dashboard/student/my-support',
    },
    INSTRUCTOR: {
      ROOT: '/dashboard/instructor',
      MY_COURSES: '/dashboard/instructor/my-courses',
      MY_STUDENTS: '/dashboard/instructor/my-students',
      MY_CALENDAR: '/dashboard/instructor/my-calendar',
      MY_QUIZZES: '/dashboard/instructor/my-quizzes',
      MY_SUPPORT: '/dashboard/instructor/my-support',
    },
  },

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
