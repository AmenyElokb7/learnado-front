import { useTranslation } from 'react-i18next'
import { CardRoot } from '../../courses.style'
import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi'
import { Category } from 'types/models/Category'
import usePagination from 'src/hooks/usePagination'
import { Checkbox, FormControlLabel, Stack, Typography } from '@mui/material'
import { BLUE, GREY } from '@config/colors/colors'
import FilterCategoriesSkeleton from './FilterCategoriesSkeleton'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { FilterCategoriesProps } from './FilterCategoriesProps'

function FilterCategories({ onCategoryChange }: FilterCategoriesProps) {
  const { t } = useTranslation()
  const { queryParams, handleFilterChange } = usePagination()
  const { data: response, isLoading } = useGetCategoriesQuery({
    ...queryParams,
    keyword: GLOBAL_VARIABLES.EMPTY_STRING,
  })

  const handleCategoryChange = (category: string) => {
    const newCategory =
      queryParams.category === category
        ? GLOBAL_VARIABLES.EMPTY_STRING
        : category

    handleFilterChange('category', newCategory)
    onCategoryChange(newCategory)
  }
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
          <FormControlLabel
            control={
              <Checkbox
                checked={queryParams.category === category.title}
                onClick={() => handleCategoryChange(category.title)}
                name={category.title}
              />
            }
            label={category.title}
          />
        </Stack>
      ))}
    </CardRoot>
  )
}

export default FilterCategories
