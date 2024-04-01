import { useNavigate } from 'react-router-dom'

import Bloc from '@components/bloc/Bloc'
import CategoriesList from './categoriesList/CategoriesList'
import { PATHS } from '@config/constants/paths'

function HomeCategries() {
  const navigate = useNavigate()
  const navigateToCategoriesPage = () => navigate(PATHS.CATEGORIES.ROOT)

  return (
    <Bloc
      title="home.category_section_title"
      description="home.category_section_description"
      hasButton={true}
      onClick={navigateToCategoriesPage}>
      <CategoriesList />
    </Bloc>
  )
}

export default HomeCategries
