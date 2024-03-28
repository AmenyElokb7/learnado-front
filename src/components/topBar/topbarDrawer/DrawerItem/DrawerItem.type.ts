import { Item } from '@components/topBar/topBarMenu'

export interface DrawerItemProps {
  item: Item
  toggleDrawer: (open: boolean) => void
}
