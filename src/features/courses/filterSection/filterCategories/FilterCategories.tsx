import { useTranslation } from 'react-i18next'
import { CardRoot } from '../../courses.style'
import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi'
import { Category } from 'types/models/Category'
import usePagination from 'src/hooks/usePagination'
import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@mui/material'
import { BLUE, GREY } from '@config/colors/colors'
import FilterCategoriesSkeleton from './FilterCategoriesSkeleton'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { FilterCategoriesProps } from './FilterCategories.type'

function FilterCategories({ handleFiltersChange }: FilterCategoriesProps) {
  const { t } = useTranslation()
  const { queryParams } = usePagination()
  const { data: response, isLoading } = useGetCategoriesQuery({
    ...queryParams,
    keyword: GLOBAL_VARIABLES.EMPTY_STRING,
  })

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
                onChange={() =>
                  handleFiltersChange({ id: category.id, name: 'category' })
                }
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
