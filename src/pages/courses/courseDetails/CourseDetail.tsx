import { Grid, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import {
  useEnrollCourseMutation,
  useGetCoursForGuesteByIdQuery,
  useGetCourseByIdQuery,
} from '@redux/apis/courses/coursesApi'
import { ConfigEnv } from '@config/configEnv'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import CourseHeader from '@features/courses/courseDetails/courseDetailsHeader/CourseDetailsHeader'
import CourseMediaCard from '@features/courses/courseDetails/courseMediaCard/CourseMediaCard'
import CourseModules from '@features/courses/courseDetails/courseModules/CourseModules'
import CourseMapCard from '@features/courses/courseDetails/courseMapCard/CourseMapCard'
import NoDataFound from '@components/noDataFound/NoDataFound'
import { useTranslation } from 'react-i18next'
import { getTeachingType } from '@utils/helpers/course.helpers'
import { StackWithBackground } from '@components/stackWithBackground/stackWithBackground.style'
import RectangularCard from '@components/cards/rectangularCard/RectangularCard'
import { CardRoot } from '../courses.style'
import { InstructorTitle } from '@features/home/homeCourses/coursesCard/courseCard.style'
import { StyledAvatar } from '@features/instructors/InstructorCard/instructorCard.style'
import { Email } from '@mui/icons-material'
import LabelWithIcon from '@components/labelWithIcon/LabelWithIcon'
import CourseOtherMediaCard from '@features/courses/courseDetails/courseMediaCard/courseOtherMediaCard/CourseOtherMediaCard'
import FallbackLoader from '@components/fallback/FallbackLoader'
import { TeachingTypeFilterEnum } from '@config/enums/teachingType.enum'
import { getUserFromLocalStorage } from '@utils/localStorage/storage'
import { useAppDispatch } from '@redux/hooks'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'

export const CourseDetail = () => {
  const { t } = useTranslation()
  const { courseId } = useParams<string>()
  const dispatch = useAppDispatch()

  const user = !!getUserFromLocalStorage()

  const [enrollCourse] = useEnrollCourseMutation()

  const { data, isLoading } = user
    ? useGetCourseByIdQuery(courseId as string)
    : useGetCoursForGuesteByIdQuery(courseId as string)

  const course = data?.data
  if (isLoading) return <FallbackLoader />

  if (!course) return <NoDataFound message={t('course.not_found')} />

  const stepsWithMedia = course?.sections?.map((section) => {
    return {
      ...section,
      media: section.media || [],
      quiz: section.quiz || [],
    }
  })

  const handleEnroll = async (id: number) => {
    try {
      await enrollCourse(id)
      dispatch(showSuccess(t('course.enroll_course_success')))
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    }
  }

  return (
    <StackWithBackground>
      <CourseHeader
        title={course.title}
        instructorName={`${course?.facilitator.firstName} ${course?.facilitator?.lastName}`}
        instructorImage={course.facilitator?.media?.[0].fileName}
        background={course.media?.[0].fileName}
        lessonsCount={course.lessonsCount}
        duration={course?.duration}
        enrolledCount={course.subscribedUsersCount}
        language={course?.language?.language}
        startTime={course.startTime ?? GLOBAL_VARIABLES.EMPTY_STRING}
        endTime={course?.endTime ?? GLOBAL_VARIABLES.EMPTY_STRING}
        teachingType={getTeachingType(course?.teachingType)}
      />

      <Grid container>
        <Grid item lg={8} sm={12} md={12}>
          {course.media && course.media.length > 1 && (
            <CourseOtherMediaCard medias={course.media} />
          )}
          <RectangularCard title={t('course.description')}>
            <Typography>{course.description}</Typography>
          </RectangularCard>

          {course.sections && course.sections.length > 0 ? (
            <CourseModules steps={stepsWithMedia} courseId={courseId} />
          ) : (
            <RectangularCard title="Modules">
              <Typography>{t('course.no_steps_found')}</Typography>
            </RectangularCard>
          )}

          {course.teachingType === TeachingTypeFilterEnum.ON_A_PLACE && (
            <CourseMapCard
              latitude={course.lat ?? null}
              longitude={course.long ?? null}
              mapboxAccessToken={ConfigEnv.MAPBOX_ACCESS_TOKEN}
            />
          )}
        </Grid>
        <Grid
          item
          lg={4}
          position={'relative'}
          top={{ sm: '0', md: '0', lg: '-200px' }}>
          <CourseMediaCard
            isEnrolled={course?.isSubscribed}
            handleEnroll={() => {
              handleEnroll(course.id)
            }}
            image={course.media?.[0].fileName}
            coursePrice={course?.price}
            discount={course.discount}
            isPaid={course.isPaid}
          />
          <CardRoot alignItems={'center'} width={{ sm: '100%', lg: '400px' }}>
            <StyledAvatar
              src={course.facilitator.media?.[0].fileName}
              alt={course.facilitator.firstName}
            />
            <InstructorTitle>
              {course.facilitator.firstName} {course.facilitator.lastName}
            </InstructorTitle>
            <LabelWithIcon
              icon={<Email />}
              label={course.facilitator.email ?? GLOBAL_VARIABLES.EMPTY_STRING}
            />
          </CardRoot>
        </Grid>
      </Grid>
    </StackWithBackground>
  )
}

export default CourseDetail
