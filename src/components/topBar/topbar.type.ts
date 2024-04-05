import { Item } from './topBarMenu'

export interface TopBarProps {
  items: Item[]
  authItems?: Item[]
}
export interface TopBarContainerProps {
  isscrolled: string
  ishomepage?: string
}
