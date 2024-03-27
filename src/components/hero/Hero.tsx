import { HeaderContainer, HeaderContent, HeaderImage } from './hero.style'
import SearchInput from 'components/Inputs/heroSearchInput/HeroSearchInput'
import { useTranslation } from 'react-i18next'

import header from 'assets/images/header.png'
import courses from 'assets/images/courses.webp'
import online from 'assets/images/online.webp'
import students from 'assets/images/students.png'
import teachers from 'assets/images/teachers.webp'

import { GLOBAL_VARIABLES } from 'config/constants/globalVariables'
import StatsticsCard from './statisticsCard/StatisticsCard'
import { StatsCardsContainer } from './statisticsCard/statisticsCard.style'

export default function Hero() {
  const { t } = useTranslation()
  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <h2>{t('home.description')}</h2>
          <h1>{t('home.title')}</h1>

          <SearchInput />
        </HeaderContent>
        <HeaderImage src={header} alt={GLOBAL_VARIABLES.APP_NAME} />
      </HeaderContainer>

      <StatsCardsContainer columnGap={2}>
        <StatsticsCard
          image={courses}
          number="1K" // from the database
          label={t('home.cerified_courses')}
        />
        <StatsticsCard
          image={teachers}
          number="26+" // from the database
          label={t('home.expert_tutors')}
        />
        <StatsticsCard
          image={online}
          number="1K" // from the database
          label={t('home.online_courses')}
        />
        <StatsticsCard
          image={students}
          number="10K" // from the database
          label={t('home.students')}
        />
      </StatsCardsContainer>
    </>
  )
}
