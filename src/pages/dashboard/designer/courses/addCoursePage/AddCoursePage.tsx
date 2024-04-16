import BodyCard from '@components/cards/bodyCard/BodyCard'
import AddCourseForm from '@features/courses/addCourse/AddCourseForm'
import { useTranslation } from 'react-i18next'

function AddCoursePage() {
  const { t } = useTranslation()
  return (
    <BodyCard title={t('course.add_course')}>
      <AddCourseForm />
    </BodyCard>
  )
}

export default AddCoursePage
