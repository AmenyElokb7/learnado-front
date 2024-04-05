import { ReactNode } from 'react'

export interface CustomLoadingButtonProps {
  children: ReactNode
  isLoading: boolean
  onClick: () => void
}
