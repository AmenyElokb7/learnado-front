import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '@redux/slices/authSlice'
import { PATHS } from '@config/constants/paths'

interface GuestGuardProps {
  children: ReactNode
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useSelector(selectAuth)

  if (isAuthenticated) {
    return <Navigate to={PATHS.DASHBOARD.ROOT} replace />
  }
  return <>{children}</>
}
