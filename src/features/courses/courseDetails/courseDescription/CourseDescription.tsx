import { useTranslation } from 'react-i18next'
import { courseDescriptionProps } from './courseDescription.type'
import RectangularCard from '@components/cards/rectangularCard/RectangularCard'
import { RectangularCardTypography } from '@components/cards/rectangularCard/RectangularCard.style'

function CourseDescription({ description }: courseDescriptionProps) {
  const { t } = useTranslation()
  return (
    <RectangularCard title={t('course.description')}>
      <RectangularCardTypography>{description}</RectangularCardTypography>
    </RectangularCard>
  )
}
export default CourseDescription
