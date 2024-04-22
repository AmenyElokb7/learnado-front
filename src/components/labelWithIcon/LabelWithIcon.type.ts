import { ReactNode } from 'react'

export interface LabelWithIconProps {
  onClick?: () => void
  icon: ReactNode
  label: string
}
