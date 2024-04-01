import { Button, Stack } from '@mui/material'
import { BlocSectionProps } from './bloc.type'
import {
  BlocContainer,
  FirstBloc,
  SecondBloc,
  ViewAllContainer,
} from './bloc.style'
import Title from '@components/typographies/title/Title'
import { DescriptionStyled } from '@components/typographies/description/description.style'
import { useTranslation } from 'react-i18next'

function Bloc({
  children,
  description,
  title,
  hasButton,
  onClick,
}: BlocSectionProps) {
  const { t } = useTranslation()
  return (
    <BlocContainer>
      <ViewAllContainer>
        <FirstBloc spacing={2}>
          <Title>{t(title)}</Title>
          {hasButton && (
            <Button variant="outlined" onClick={onClick}>
              {t('home.view_all')}
            </Button>
          )}
        </FirstBloc>
        <SecondBloc>
          <DescriptionStyled>{t(description)}</DescriptionStyled>
        </SecondBloc>
      </ViewAllContainer>
      <Stack alignItems={'center'}>{children}</Stack>
    </BlocContainer>
  )
}

export default Bloc
