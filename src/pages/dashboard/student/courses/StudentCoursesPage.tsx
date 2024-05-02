import BodyCard from '@components/cards/bodyCard/BodyCard'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import CoursesTabs from './coursesTabs/CoursesTabs'

function StudentCoursesPage() {
  const { t } = useTranslation()
  return (
    <BodyCard title={t('course.enrolled_courses')}>
      <CoursesTabs />
      <Outlet />
    </BodyCard>
  )
}

export default StudentCoursesPage
