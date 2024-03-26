export const PATHS = {
  ROOT: '/',

  COURSES: {
    ROOT: 'courses',
    COURSES_DETAIL: 'courses/:courseId',
  },

  AUTH: {
    ROOT: 'auth',
    LOGIN: 'login',
    SIGNUP: 'signup',
    FORGET_PASSWORD: 'forget-password',
    RESET_PASSWORD: 'reset-password',
  },

  DASHBOARD: {
    ROOT: '/dashboard',
  },

  ANY: '*',
  NOT_FOUND: '404',
  INTERNAL_SERVER_ERROR: '500',
}
