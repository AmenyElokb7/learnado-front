import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { PATHS } from '@config/constants/paths'
import { getUserFromLocalStorage } from '@utils/localStorage/storage'

interface RoleBasedGuardProps {
  accessibleRoles: number[]
  children: ReactNode
}

export function RoleBasedGuard({
  accessibleRoles,
  children,
}: RoleBasedGuardProps) {
  const user = getUserFromLocalStorage()

  if (!user) {
    return <Navigate to={PATHS.ROOT} replace />
  }

  return (
    <>
      {!accessibleRoles.includes(user.role) ? (
        <Navigate to={PATHS.MAIN.ERROR.P_403} replace />
      ) : (
        <>{children}</>
      )}
    </>
  )
}
