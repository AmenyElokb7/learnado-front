import { useTranslation } from 'react-i18next'
import CourseModule from './CourseModule'
import { CourseContentProps } from './courseModules.type'
import RectangularCard from '@components/rectangularCard/RectangularCard'

export const CourseModules = ({ steps }: CourseContentProps) => {
  const { t } = useTranslation()
  return (
    <RectangularCard title={t('course.modules')}>
      {steps.map((step) => (
        <CourseModule
          key={step.id}
          title={step.title}
          media={step.media}
          duration={step.duration}
        />
      ))}
    </RectangularCard>
  )
}

export default CourseModules
