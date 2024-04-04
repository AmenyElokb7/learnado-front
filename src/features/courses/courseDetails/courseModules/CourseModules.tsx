import { useTranslation } from 'react-i18next'
import CourseLModule from './CourseLModule'
import { CourseContentProps } from './courseModule.type'
import RectangularCard from '@components/rectangularCard/RectangularCard'

export const CourseModules = ({ steps }: CourseContentProps) => {
  const { t } = useTranslation()
  return (
    <RectangularCard title={t('course.modules')}>
      {steps.map((step) => (
        <CourseLModule
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
