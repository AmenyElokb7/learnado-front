import BodyCard from '@components/cards/bodyCard/BodyCard'
import AddCourseForm from '@features/courses/addCourse/AddCourseForm'
import { Typography } from '@mui/material'
import { useGetCourseForDesignerByIdQuery } from '@redux/apis/courses/coursesApi'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

function UpdateCoursePage() {
  const { t } = useTranslation()

  const { courseId } = useParams()

  const { data, isLoading, isError } = useGetCourseForDesignerByIdQuery(
    courseId as string,
  )

  if (isError) return <Typography>Error</Typography>

  if (isLoading) return <Typography>Loading...</Typography>

  return (
    <BodyCard title={t('course.update_course')}>
      <AddCourseForm isEditMode courseDefaultValues={data?.data} />
    </BodyCard>
  )
}

export default UpdateCoursePage
