import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ReactNode } from 'react'
import { selectAuth } from '@redux/slices/authSlice'
import { PATHS } from '@config/constants/paths'
interface AuthGuardProps {
  children: ReactNode
}
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useSelector(selectAuth)

  if (!isAuthenticated) {
    return <Navigate to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`} replace />
  }

  return <>{children}</>
}
