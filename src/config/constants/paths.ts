export const PATHS = {
  ROOT: '/',

  COURSES: {
    ROOT: 'courses',
    COURSES_DETAIL: 'courses/:courseId',
  },

  LEARNING_PATH: {
    ROOT: 'learning-path',
  },

  CATEGORIES: {
    ROOT: 'categories',
  },

  INSTUCTORS: 'instructors',
  ABOUT_US: 'aboutUs',
  AUTH: {
    ROOT: 'auth',
    LOGIN: 'login',
    SIGNUP: 'signup',
    FORGET_PASSWORD: 'forget-password',
    RESET_PASSWORD: 'reset-password',
  },

  DASHBOARD: {
    ROOT: 'dashboard',
    ADMIN: {
      ROOT: 'admin',
      STUDENTS: 'students',
      DESIGNERS: 'designers',
      FACILITATORS: 'facilitators',
      POSTS: 'posts',
      EDIT_USER: 'students/:id',
      ADD_USER: 'add',
    },
  },
  MAIN: {
    HOME: '',
    ERROR: {
      P_500: '500',
      P_404: '404',
      P_403: '403',
    },
  },
  ANY: '*',
}
