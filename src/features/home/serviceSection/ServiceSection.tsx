import Bloc from '@components/bloc/Bloc'
import { Grid, Stack } from '@mui/material'

import { StatsCardRoot } from '@features/home/hero/statisticsCard/statisticsCard.style'
import ServiceSectionCard from './serviceSectionCard/ServiceSectionCard'
import { useTranslation } from 'react-i18next'
import { BlocBackground } from '../homeCourses/coursesCard/courseCard.style'
import { serviceCardsData } from './serviceSectionCard/serviceSection.constants'

import service from '@assets/images/join.png'
import learning from '@assets/images/share.png'
import { ImageService } from './serviceSection.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function ServiceSection() {
  const { t } = useTranslation()
  return (
    <>
      <Stack
        direction={{ lg: 'row', sm: 'column', md: 'column' }}
        height={{ lg: '100vh', sm: 'auto' }}
        alignItems="center">
        <Bloc
          title={t('home.service_title')}
          description={t('home.service_description')}>
          <Grid container ml={{ lg: 16 }}>
            {serviceCardsData.map((card, index) => (
              <StatsCardRoot key={index}>
                <ServiceSectionCard
                  icon={card.icon}
                  description={t(card.description)}
                />
              </StatsCardRoot>
            ))}
          </Grid>
        </Bloc>

        <ImageService src={service} alt={GLOBAL_VARIABLES.APP_NAME} />
      </Stack>

      <BlocBackground>
        <Stack direction={{ lg: 'row', sm: 'column', md: 'column' }}>
          <ImageService src={learning} />
          <Bloc
            title={t('home.share_knowledge')}
            description={t('home.share_knowledge_description')}
          />
        </Stack>
      </BlocBackground>
    </>
  )
}

export default ServiceSection
