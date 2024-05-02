import BodyCard from '@components/cards/bodyCard/BodyCard'
import { useTranslation } from 'react-i18next'
import LanguagesTable from './languagesTable/LanguagesTable'

function LanguagesPage() {
  const { t } = useTranslation()

  return (
    <BodyCard
      title={t('language.languages')}
      buttonText={t('language.add_language')}
      onClick={() => {}}>
      <LanguagesTable />
    </BodyCard>
  )
}

export default LanguagesPage
