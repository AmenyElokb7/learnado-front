import { Stack } from '@mui/material'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CategoryCard from '../categoryCard/CategoryCard'
import { SliderSettings } from './categoriesList.constants'
import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi'
import { ConfigEnv } from '@config/configEnv'
import noImage from '@assets/images/image_not_available.png'

function CategoriesList() {
  const { data: response, error, isLoading } = useGetCategoriesQuery({})
  const categories = response?.data || []

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error occurred: {error.toString()}</div>
  if (!categories) {
    return <div>No categories to display</div>
  }

  return (
    <Stack maxWidth={'90vw'}>
      <Slider {...SliderSettings}>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryCard
              title={category.category}
              url={
                `${ConfigEnv.MEDIA_BASE_URL}/${category.media[0].file_name}` ||
                noImage
              }
              nbrOfLessons={category.courses_count}
            />
          </div>
        ))}
      </Slider>
    </Stack>
  )
}

export default CategoriesList
