import { Navigate, RouteObject } from 'react-router-dom'
import { PATHS } from '@config/constants/paths'
import GuestLayout from '@layouts/GuestLayout/GuestLayout'
import { lazy } from 'react'
import NotFound from '@pages/notFound/NotFound'
import Courses from '@pages/courses/Courses'
import AboutUsPage from '@pages/about/AboutUsPage'
import InstructorsPage from '@pages/instructors/InstructorsPage'
import CourseDetail from '@pages/courses/courseDetails/CourseDetail'
const HomePage = lazy(() => import('src/pages/home/HomePage'))

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
    ],
  },
]
