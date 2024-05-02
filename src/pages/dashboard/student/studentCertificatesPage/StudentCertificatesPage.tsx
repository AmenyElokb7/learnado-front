import BodyCard from '@components/cards/bodyCard/BodyCard'
import StudentCertificatesTable from './studentCertificatesTable/StudentCertificatesTable'
import { useTranslation } from 'react-i18next'

function StudentCertificatesPage() {
  const { t } = useTranslation()
  return (
    <BodyCard title={t('course.certificates')}>
      <StudentCertificatesTable />
    </BodyCard>
  )
}

export default StudentCertificatesPage
