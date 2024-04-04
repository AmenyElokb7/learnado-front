import CategoriesListSkeleton from './FilterCategoriesListSkeleton'
import { CardRoot } from '../../../../pages/courses/courses.style'
import { Typography } from '@mui/material'
import { BLUE } from '@config/colors/colors'
import { useTranslation } from 'react-i18next'

function FilterCategoriesSkeleton() {
  const { t } = useTranslation()
  return (
    <CardRoot spacing={4}>
      <Typography variant="h3" fontWeight="bold" color={BLUE.main}>
        {t('course.categories')}
      </Typography>
      {[...Array(10)].map((_, index) => (
        <CategoriesListSkeleton key={index} />
      ))}
    </CardRoot>
  )
}

export default FilterCategoriesSkeleton
