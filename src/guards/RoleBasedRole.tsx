import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAuth } from '@redux/slices/authSlice'
import { PATHS } from '@config/constants/paths'

interface RoleBasedGuardProps {
  accessibleRoles: number[]
  children: ReactNode
}

export function RoleBasedGuard({
  accessibleRoles,
  children,
}: RoleBasedGuardProps) {
  const { user } = useSelector(selectAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !accessibleRoles.includes(user.role)) {
      navigate(PATHS.MAIN.ERROR.P_403, { replace: true })
    }
  }, [user, accessibleRoles, navigate])

  if (!user || !accessibleRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
