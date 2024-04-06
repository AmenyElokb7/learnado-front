import { Navigate, RouteObject } from 'react-router-dom'
import { PATHS } from '@config/constants/paths'
import GuestLayout from '@layouts/GuestLayout/GuestLayout'
import { lazy } from 'react'
import { GuestGuard } from '@guards/GuestGuard'
import AuthLayout from '@layouts/authLayout/AuthLayout'
import DashboardLayout from '@layouts/dashboardLayout/DashboardLayout'
import { AuthGuard } from '@guards/AuthGuard'


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
const SignUpPage = lazy(() => import('src/pages/auth/signup/signupPage'))
const LoginPage = lazy(() => import('src/pages/auth/login/LoginPage'))
const ProfilePage = lazy(() => import('src/pages/profile/ProfilePage'))
const DashboardPage = lazy(() => import('src/pages/dashboard/DashboardPage'))

export const ROUTE_CONFIG: RouteObject[] = [
  {
    path: PATHS.AUTH.ROOT,
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      { path: PATHS.AUTH.LOGIN, element: <LoginPage /> },
      { path: PATHS.AUTH.SIGNUP, element: <SignUpPage /> },
    ],
  },
  {
    path: PATHS.ROOT,
    element: <GuestLayout />,
    children: [
      { path: PATHS.ROOT, element: <HomePage /> },
      { path: PATHS.COURSES.ROOT, element: <Courses /> },
      { path: PATHS.COURSES.COURSES_DETAIL, element: <CourseDetail /> },
      { path: PATHS.ABOUT_US, element: <AboutUsPage /> },
      { path: PATHS.INSTRUCTORS, element: <InstructorsPage /> },
    ],
  },
  {
    path: PATHS.DASHBOARD.ROOT,
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      { path: PATHS.DASHBOARD.ROOT, element: <DashboardPage /> },
      { path: PATHS.DASHBOARD.PROFILE, element: <ProfilePage /> },
    ],
  },
  { path: PATHS.MAIN.ERROR.P_404, element: <NotFound /> },
  {
    path: PATHS.ANY,
    element: <Navigate to={PATHS.MAIN.ERROR.P_404} replace />,
  },
]
