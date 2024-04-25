import RemoveIcon from '@mui/icons-material/Remove'

import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import CustomLink from '@components/customLink/CustomLink'
import Title from '@components/typographies/title/Title'
import { DescriptionStyled } from '@components/typographies/description/description.style'
import { PATHS } from '@config/constants/paths'
import { HeaderRoot, PathStyled } from './header.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

const Header = () => {
  const { t } = useTranslation()
  const location = useLocation()

  const title = (
    location.pathname.split('/')[1] || GLOBAL_VARIABLES.EMPTY_STRING
  )
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^./, (str) => str.toUpperCase())

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
