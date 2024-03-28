import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CustomLink from '@components/customLink/CustomLink'
import { DrawerItemProps } from './DrawerItem.type'

const DrawerItem = ({ item, toggleDrawer }: DrawerItemProps) => {
  const { t } = useTranslation()

  return (
    <Box onClick={() => toggleDrawer(false)}>
      <CustomLink
        label={t(item.label)}
        to={item.path}
        isActive={item.path === window.location.pathname}
      />
    </Box>
  )
}

export default DrawerItem
