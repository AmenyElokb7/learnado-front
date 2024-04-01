import { ReactNode } from 'react'

export interface BlocSectionProps {
  children?: ReactNode
  title: string
  description: string
  onClick?: () => void
  hasButton?: boolean
}
