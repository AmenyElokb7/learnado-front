import { Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'

import nodatafound from '@assets/images/No_data_found.gif'
import { DescriptionStyled } from '@components/typographies/description/description.style'

function NoDataFound({ message }: NoDataFoundProps) {
  const { t } = useTranslation()
  return (
    <Stack alignItems={'center'}>
      <img src={nodatafound} alt={t('home.no_data_found')} width={450} />
      <DescriptionStyled>{t(message)}</DescriptionStyled>
    </Stack>
  )
}

export default NoDataFound
