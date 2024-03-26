import { RouteObject } from 'react-router-dom'
import { PATHS } from 'config/constants/paths'
import { Suspense, lazy } from 'react'
import GuestLayout from 'layouts/GuestLayout/GuestLayout'

const HomePage = lazy(() => import('src/pages/home/HomePage'))

export const ROUTE_CONFIG: RouteObject[] = [
  {
    path: PATHS.ROOT,
    element: <GuestLayout />,
    children: [
      {
        path: PATHS.ROOT,
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
]
