import Bloc from '@components/bloc/Bloc'
import ViewAllCategory from './ViewAllCategory'
import CategoriesList from '../categoriesList/CategoriesList'

function CategorySection() {
  return (
    <>
      <Bloc
        titleComponent={<ViewAllCategory />}
        contentComponent={<CategoriesList />}
      />
    </>
  )
}
export default CategorySection
