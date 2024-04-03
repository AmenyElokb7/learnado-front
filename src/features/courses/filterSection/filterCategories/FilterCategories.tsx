import { useTranslation } from 'react-i18next'
import { CardRoot } from '../../courses.style'
import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi'
import { Category } from 'types/models/Category'
import usePagination from 'src/hooks/usePagination'
import {
  Collapse,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material'
import { BLUE } from '@config/colors/colors'
import FilterCategoriesSkeleton from './FilterCategoriesSkeleton'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { FilterCategoriesProps } from './FilterCategories.type'

import { useState } from 'react'
import { StyledExpandIcon } from '@components/styledExpandIcon/styledExpandIcon.style'

function FilterCategories({
  filtersQueryParams,
  handleFiltersChange,
}: FilterCategoriesProps) {
  const { t } = useTranslation()
  const { queryParams } = usePagination()
  const { data: response, isLoading } = useGetCategoriesQuery({
    ...queryParams,
    keyword: GLOBAL_VARIABLES.EMPTY_STRING,
  })

  const [isOpened, setIsOpened] = useState(true)

  const onCollapseClick = () => setIsOpened((prev) => !prev)

  const categories = response?.data as Category[]

  if (categories?.length === 0) return <CardRoot />

  if (isLoading) return <FilterCategoriesSkeleton />

  return (
    <CardRoot onClick={onCollapseClick}>
      <Stack
        direction="row"
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Typography variant="h3" color={BLUE.main}>
          {t('course.categories')}
        </Typography>
        <IconButton>
          <StyledExpandIcon
            isopened={
              isOpened
                ? GLOBAL_VARIABLES.TRUE_STRING
                : GLOBAL_VARIABLES.FALSE_STRING
            }
          />
        </IconButton>
      </Stack>
      <Collapse in={isOpened} timeout={700}>
        <RadioGroup>
          {categories?.map((category) => {
            const isChecked = filtersQueryParams.filters?.some(
              (item) => item.id === category.id,
            )
            return (
              <FormControlLabel
                key={category.id}
                control={
                  <Radio
                    checked={isChecked ? true : false}
                    value={category.id}
                    onChange={() =>
                      handleFiltersChange({ id: category.id, name: 'category' })
                    }
                    name={category.title}
                  />
                }
                label={category.title}
              />
            )
          })}
        </RadioGroup>{' '}
      </Collapse>
    </CardRoot>
  )
}

export default FilterCategories
