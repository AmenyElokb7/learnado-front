import { Grid, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetCourseByIdQuery } from '@redux/apis/courses/coursesApi'
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
export const CourseDetail = () => {
  const { t } = useTranslation()
  const { courseId } = useParams<string>()
  const { data, isLoading } = useGetCourseByIdQuery(courseId as string)

  if (isLoading) return <div>Loading...</div>

  if (!data?.data) return <NoDataFound message={t('course.not_found')} />

  const stepsWithMedia = data.data?.modules?.map((module) => {
    return {
      ...module,
      media: module.media || [],
    }
  })

  const course = data?.data

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

          {course.modules && course.modules.length > 0 ? (
            <CourseModules steps={stepsWithMedia} />
          ) : (
            <RectangularCard title="Modules">
              <Typography>{t('course.no_steps_found')}</Typography>
            </RectangularCard>
          )}

          <CourseMapCard
            latitude={course.lat ?? null}
            longitude={course.long ?? null}
            mapboxAccessToken={ConfigEnv.MAPBOX_ACCESS_TOKEN}
          />

        </Grid>
        <Grid
          item
          lg={4}
          position={'relative'}
          top={{ sm: '0', md: '0', lg: '-200px' }}>
          <CourseMediaCard
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
