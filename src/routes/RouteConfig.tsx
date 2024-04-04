import { Navigate, RouteObject } from 'react-router-dom'
import { PATHS } from '@config/constants/paths'
import GuestLayout from '@layouts/GuestLayout/GuestLayout'
import { lazy } from 'react'

const HomePage = lazy(() => import('src/pages/home/HomePage'))
const Courses = lazy(() => import('src/pages/courses/Courses'))
const CourseDetail = lazy(
  () => import('src/pages/courses/courseDetails/CourseDetail'),
)
const AboutUsPage = lazy(() => import('src/pages/about/AboutUsPage'))
const InstructorsPage = lazy(
  () => import('src/pages/instructors/InstructorsPage'),
)
const NotFound = lazy(() => import('src/pages/notFound/NotFound'))
const SignUp = lazy(() => import('src/pages/auth/signupPage'))

export const ROUTE_CONFIG: RouteObject[] = [
  {
    path: PATHS.ROOT,
    element: <GuestLayout />,
    children: [
      {
        path: PATHS.ROOT,
        element: <HomePage />,
      },
      {
        path: PATHS.COURSES.ROOT,
        element: <Courses />,
      },
      {
        path: PATHS.COURSES.COURSES_DETAIL,
        element: <CourseDetail />,
      },
      {
        path: PATHS.ABOUT_US,
        element: <AboutUsPage />,
      },
      {
        path: PATHS.INSTRUCTORS,
        element: <InstructorsPage />,
      },
      { path: PATHS.MAIN.ERROR.P_404, element: <NotFound /> },
      {
        path: PATHS.ANY,
        element: <Navigate to={PATHS.MAIN.ERROR.P_404} replace />,
      },
      {
        path: PATHS.AUTH.SIGNUP,
        element: <SignUp />,
      },
    ],
  },
]
