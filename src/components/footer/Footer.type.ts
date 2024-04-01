import { ReactNode } from 'react'

export interface FooterColumn {
  id: number
  title: string
  hasInput?: boolean
  items: FooterItem[]
}

export interface FooterItem {
  id: number
  title: string
  path?: string
  icon?: ReactNode
}

export interface RotatingImageProps {
  isfootervisible: string
}
