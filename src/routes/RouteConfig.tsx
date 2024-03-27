import { RouteObject } from 'react-router-dom'
import { PATHS } from 'config/constants/paths'
import GuestLayout from 'layouts/GuestLayout/GuestLayout'
import { lazy } from 'react'
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
    ],
  },
]
