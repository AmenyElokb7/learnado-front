import { Stack } from '@mui/material'

import { useTranslation } from 'react-i18next'

import Title from '@components/typographies/title/Title'
import { DescriptionStyled } from '@components/typographies/description/description.style'

import notFound from '@assets/images/not-found.png'

function NotFound() {
  const { t } = useTranslation()

  return (
    <Stack justifyContent={'center'} alignItems={'center'} p={16} spacing={4}>
      <img src={notFound} alt={t('home.page_not_found')} width={600} />
      <Title>{t('home.page_not_found')}</Title>
      <DescriptionStyled>
        {t('home.page_not_found_description')}
      </DescriptionStyled>
    </Stack>
  )
}

export default NotFound
