import RemoveIcon from '@mui/icons-material/Remove'

import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import CustomLink from '@components/customLink/CustomLink'
import Title from '@components/typographies/title/Title'
import { DescriptionStyled } from '@components/typographies/description/description.style'
import { PATHS } from '@config/constants/paths'
import { HeaderRoot, PathStyled } from './header.style'

const Header = () => {
  const { t } = useTranslation()
  const location = useLocation()

  const pathname = location.pathname.split('/')
  const title = pathname[pathname.length - 1]

  return (
    <HeaderRoot>
      <Title>{title}</Title>
      <PathStyled spacing={2} direction={'row'}>
        <CustomLink to={PATHS.ROOT} label={t('topbar.home')} isActive={false} />
        <RemoveIcon color="primary" fontSize="large" />
        <DescriptionStyled> {title}</DescriptionStyled>
      </PathStyled>
    </HeaderRoot>
  )
}

export default Header
