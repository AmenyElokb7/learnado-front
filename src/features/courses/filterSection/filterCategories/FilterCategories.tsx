import { useTranslation } from 'react-i18next'
import { CardRoot } from '../../courses.style'
import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi'
import { Category } from 'types/models/Category'
import usePagination from 'src/hooks/usePagination'
import { Checkbox, Stack, Typography } from '@mui/material'
import { BLUE, GREY } from '@config/colors/colors'
import FilterCategoriesSkeleton from './FilterCategoriesSkeleton'

function FilterCategories() {
  const { t } = useTranslation()
  const { queryParams } = usePagination()
  const { data: response, isLoading } = useGetCategoriesQuery(queryParams)

  const categories = response?.data as Category[]

  if (categories?.length === 0) return <CardRoot />

  if (isLoading) return <FilterCategoriesSkeleton />

  return (
    <CardRoot>
      <Typography variant="h3" color={BLUE.main}>
        {t('course.categories')}
      </Typography>
      {categories?.map((category) => (
        <Stack key={category.id} color={GREY.main}>
          <Typography>
            <Checkbox />
            {category.title}
          </Typography>
        </Stack>
      ))}
    </CardRoot>
  )
}

export default FilterCategories
