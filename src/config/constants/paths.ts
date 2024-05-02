export const PATHS = {
  ROOT: '/',

  COURSES: {
    ROOT: '/Courses',
    COURSES_DETAIL: '/courses/:courseId',
    STEP: '/courses/:courseId/:stepId',
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
    SET_PASSWORD: 'password-set',
  },

  DASHBOARD: {
    ROOT: '/dashboard',
    PROFILE: {
      ROOT: '/dashboard/profile',
      SETTINGS: '/dashboard/profile/settings',
    },
    ADMIN: {
      ROOT: '/dashboard/admin',
      USERS: {
        ROOT: '/dashboard/admin/users',
        ALL: '/dashboard/admin/users/all',
        PENDING: '/dashboard/admin/users/pending',
        ACCEPTED: '/dashboard/admin/users/accepted',
        EDIT_USER: '/dashboard/admin/users/:userId',
        ADD_USER: '/dashboard/admin/addUser',
      },
      CATEGORY: {
        ROOT: '/dashboard/admin/categories',
        ADD_CATEGORY: '/dashboard/admin/categories/add-category',
        EDIT_CATEGORY: '/dashboard/admin/categories/:categoryId',
      },
      LANGUAGES: {
        ROOT: '/dashboard/admin/languages',
        ADD_LANGUAGE: '/dashboard/admin/languages/add-language',
        EDIT_LANGUAGE: '/dashboard/admin/languages/:languageId',
      },
      POSTS: '/dashboard/admin/posts',
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
    DESIGNER: {
      ROOT: '/dashboard/designer',
      MY_COURSES: {
        ROOT: '/dashboard/designer/my-courses',
        ADD_COURSE: '/dashboard/designer/my-courses/add-course',
        EDIT_COURSE: '/dashboard/designer/my-courses/:courseId',
      },
      MY_LEARNING_PATHS: '/dashboard/designer/my-learning-paths',
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
