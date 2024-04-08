import { Stack } from '@mui/material'
import Slider from 'react-slick'
import { useTranslation } from 'react-i18next'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import CategoryCard from '../categoryCard/CategoryCard'
import { SliderSettings } from './categoriesList.constants'
import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi'
import NoDataFound from '@components/noDataFound/NoDataFound'
import CategoriesListSkeleton from './categoriesListSkeleton/CategoriesListSkeleton'
import usePagination from 'src/hooks/usePagination'
import { Category } from 'types/models/Category'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function CategoriesList() {
  const { queryParams } = usePagination()
  const { data: response, isLoading } = useGetCategoriesQuery({
    ...queryParams,
    keyword: GLOBAL_VARIABLES.EMPTY_STRING,
  })

  const categories = response?.data as Category[]

  const { t } = useTranslation()

  if (categories?.length === 0)
    return <NoDataFound message={t('home.no_category_found')} />

  if (isLoading) return <CategoriesListSkeleton />
  return (
    <Stack maxWidth={'90vw'}>
      <Slider {...SliderSettings}>
        {categories?.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            url={category.url}
            nbrOfLessons={category.nbrOfLessons}
          />
        ))}
      </Slider>
    </Stack>
  )
}

export default CategoriesList
