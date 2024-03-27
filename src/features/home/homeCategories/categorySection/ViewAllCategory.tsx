import { Button } from '@mui/material'

import Title from '@components/typographies/title/Title'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  FirstBloc,
  SecondBloc,
  ViewAllContainer,
} from '@components/bloc/bloc.style'
import { PATHS } from '@config/constants/paths'
import { DescriptionStyled } from '@components/typographies/description/description.style'

function ViewAllCategory() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <ViewAllContainer spacing={4}>
      <FirstBloc spacing={2}>
        <Title>{t('home.category_section_title')}</Title>
        <Button
          onClick={() => navigate(PATHS.CATEGORIES.ROOT)}
          variant="outlined">
          {t('home.view_all')}
        </Button>
      </FirstBloc>
      <SecondBloc>
        <DescriptionStyled>
          {t('home.category_section_description')}
        </DescriptionStyled>
      </SecondBloc>
    </ViewAllContainer>
  )
}

export default ViewAllCategory
