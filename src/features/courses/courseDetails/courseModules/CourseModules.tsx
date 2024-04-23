import { useTranslation } from 'react-i18next'
import CourseModule from './CourseModule'
import { CourseContentProps } from './courseModules.type'
import RectangularCard from '@components/cards/rectangularCard/RectangularCard'

export const CourseModules = ({ steps, courseId }: CourseContentProps) => {
  const { t } = useTranslation()
  return (
    <RectangularCard title={t('course.modules')}>
      {steps.map((step) => (
        <CourseModule
          key={step.id}
          title={step.title}
          media={step.media || []}
          duration={Number(step.duration)}
          section={step}
          courseId={courseId}
          sectionId={step.id}
        />
      ))}
    </RectangularCard>
  )
}

export default CourseModules
