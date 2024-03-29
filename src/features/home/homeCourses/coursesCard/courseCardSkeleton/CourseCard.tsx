import { useNavigate } from 'react-router-dom'

import { Divider, Stack, Typography } from '@mui/material'
import { CourseCardProps } from '../courseCard.type'
import {
  BuyButton,
  CourseCardContainer,
  CourseContent,
  CourseImage,
  CourseImageContainer,
  CourseTitle,
  InstructorAvatar,
  InstructorInfo,
  PriceLabel,
} from './courseCard.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useTranslation } from 'react-i18next'

const CourseCard = ({
  image,
  instructorName,
  instructorAvatar,
  courseTitle,
  coursePrice,
  lessonCount,
  duration,
}: CourseCardProps) => {
  const { t } = useTranslation()

  return (
    <CourseCardContainer>
      <CourseImageContainer>
        <CourseImage src={image} alt={courseTitle} />
        <PriceLabel>
          <Typography variant="body2" fontWeight="bold">
            {coursePrice === GLOBAL_VARIABLES.ZERO_STRING
              ? GLOBAL_VARIABLES.FREE
              : coursePrice}
          </Typography>
        </PriceLabel>
      </CourseImageContainer>

      <InstructorInfo>
        <InstructorAvatar src={instructorAvatar} alt={instructorName} />
        <Typography variant="body2">{instructorName}</Typography>
      </InstructorInfo>
      <CourseContent>
        <Stack
          direction={'row'}
          justifyContent="space-between"
          alignItems="center">
          <CourseTitle variant="h6">{courseTitle}</CourseTitle>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="caption">{`${lessonCount} Lessons`}</Typography>
          <Typography variant="caption">{duration}</Typography>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <BuyButton variant="outlined" color="primary">
            {coursePrice === GLOBAL_VARIABLES.ZERO_STRING
              ? t('home.enroll_button')
              : t('home.buy_button')}
          </BuyButton>
        </Stack>
      </CourseContent>
    </CourseCardContainer>
  )
}

export default CourseCard
