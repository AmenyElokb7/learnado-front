import BodyCard from '@components/cards/bodyCard/BodyCard'
import { useTranslation } from 'react-i18next'
import CategoriesTable from './categoriesTable/CategoriesTable'

function CategoriesPage() {
  const { t } = useTranslation()
  return (
    <BodyCard
      title={t('category.categories')}
      buttonText={t('category.add_category')}
      onClick={() => {}}>
      <CategoriesTable />
    </BodyCard>
  )
}

export default CategoriesPage
