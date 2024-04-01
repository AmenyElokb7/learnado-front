import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Divider, Stack, Tooltip, Typography } from '@mui/material'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined'

import { CourseCardProps } from './courseCard.type'
import {
  BuyButton,
  CourseCardContainer,
  CourseContent,
  CourseImage,
  CourseImageContainer,
  CourseTitle,
  DiscountLabel,
  InstructorAvatar,
  InstructorInfo,
  InstructorJob,
  InstructorTitle,
  PriceLabel,
  StyledDiscountedPrice,
} from './courseCard.style'
import { PATHS } from '@config/constants/paths'
import LabelWithIcon from '@components/labelWithIcon/LabelWithIcon'
import { Discount } from '@mui/icons-material'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

const CourseCard = ({
  id,
  image,
  instructorName,
  instructorAvatar,
  courseTitle,
  coursePrice,
  discount,
  isPaid,
  lessonsCount,
  duration,
}: CourseCardProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const navigateToCourseDetailPage = (id: number) => {
    return navigate(`${PATHS.COURSES.ROOT}/${id}`)
  }

  return (
    <CourseCardContainer onClick={() => navigateToCourseDetailPage(id)}>
      <CourseImageContainer>
        <CourseImage src={image} alt={courseTitle} />
        {discount !== GLOBAL_VARIABLES.FREE_CURRENCY ? (
          <DiscountLabel>
            <Typography fontSize="20px" fontWeight="bold">
              {discount}
            </Typography>
            <StyledDiscountedPrice>{coursePrice}</StyledDiscountedPrice>
          </DiscountLabel>
        ) : (
          <PriceLabel>
            <Typography variant="body2" fontWeight="bold">
              {!isPaid ? t('home.free') : coursePrice}
            </Typography>
          </PriceLabel>
        )}
      </CourseImageContainer>

      <InstructorInfo>
        <InstructorAvatar src={instructorAvatar} alt={instructorName} />
        <Stack>
          <InstructorTitle>{instructorName}</InstructorTitle>
          <InstructorJob>{t('course.instructor')}</InstructorJob>
        </Stack>
      </InstructorInfo>

      <CourseContent>
        <Tooltip title={courseTitle} placement="top">
          <CourseTitle variant="h3">{courseTitle}</CourseTitle>
        </Tooltip>
        <Stack direction={'row'} justifyContent={'space-between'} mt={1} mb={1}>
          <LabelWithIcon
            label={t('course.number_of_lessons', { count: lessonsCount })}
            icon={<MenuBookOutlinedIcon />}
          />

          <LabelWithIcon label={duration} icon={<TimerOutlinedIcon />} />
        </Stack>
        <Divider />
        <Stack alignItems="flex-end">
          <BuyButton variant="outlined" color="primary">
            {!isPaid ? t('home.enroll_button') : t('home.buy_button')}
          </BuyButton>
        </Stack>
      </CourseContent>
    </CourseCardContainer>
  )
}

export default CourseCard
