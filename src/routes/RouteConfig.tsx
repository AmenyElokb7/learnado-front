import { RouteObject } from 'react-router-dom'
import { PATHS } from 'config/constants/paths'
import GuestLayout from 'layouts/GuestLayout/GuestLayout'
import HomePage from 'pages/home/HomePage'

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
