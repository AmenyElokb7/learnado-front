import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { PATHS } from '@config/constants/paths'
import { getFromLocalStorage } from '@utils/localStorage/storage'
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum'
interface AuthGuardProps {
  children: ReactNode
}
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const token = getFromLocalStorage(LocalStorageKeysEnum.AccessToken)

  if (!token) {
    return <Navigate to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`} replace />
  }

  return <>{children}</>
}
