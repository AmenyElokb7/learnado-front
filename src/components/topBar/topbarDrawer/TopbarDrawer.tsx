import { Drawer, Box, Avatar, Divider, Button, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import DrawerItem from './DrawerItem/DrawerItem'
import { ItemsMain } from '@components/topBar/topBarMenu'
import lernado from '@assets/logo/lernado.png'
import { PATHS } from '@config/constants/paths'
import { TopbarDrawerProps } from './TopbarDrawer.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

const TopbarDrawer = ({ open, toggleDrawer }: TopbarDrawerProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={() => toggleDrawer(false)}>
        <Stack direction="row" justifyContent="center" sx={{ p: 2 }}>
          <Avatar
            alt={GLOBAL_VARIABLES.APP_NAME}
            src={lernado}
            variant="square"
            sx={{ width: 120, height: 'auto' }}
          />
        </Stack>
        <Divider />

        {ItemsMain.map((item) => (
          <div key={item.id}>
            <Stack m={2}>
              <DrawerItem item={item} toggleDrawer={toggleDrawer} />
            </Stack>
            <Divider />
          </div>
        ))}

        <Stack spacing={2} sx={{ p: 4 }}>
          <Button variant="outlined" onClick={() => navigate(PATHS.AUTH.LOGIN)}>
            {t('topbar.login')}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SIGNUP}`)}>
            {t('topbar.signup')}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  )
}

export default TopbarDrawer
