import { Theme } from '@mui/material'
import { Item } from './topBarMenu'

export interface TopBarProps {
  items: Item[]
}
export interface TopBarContainerProps {
  theme?: Theme
  isScrolled: boolean
  isHomePage: boolean
}
