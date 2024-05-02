import { Box, Button, Stack, Typography } from '@mui/material'
import { CourseHeaderProps } from './courseDetails.type'
import { useTranslation } from 'react-i18next'
import {
  HeaderBackgroundImage,
  HeaderDetail,
  HeaderOverlay,
} from './courseDetails.style'
import {
  InstructorAvatar,
  InstructorInfo,
  InstructorJob,
  InstructorTitle,
} from '@features/home/homeCourses/coursesCard/courseCard.style'
import LabelWithIcon from '@components/labelWithIcon/LabelWithIcon'

import languageIcon from '@assets/logo/languages/language.png'
import peopleIcon from '@assets/logo/people.svg'
import courseIcon from '@assets/logo/icon-01.svg'
import timerIcon from '@assets/logo/timer-icon.svg'
import calendar from '@assets/logo/calendar.png'
import arrow from '@assets/logo/Arrow_east.svg'
import { transformDateTimeFormat } from '@utils/helpers/date.helpers'

const CourseHeader = ({
  title,
  instructorName,
  instructorImage,
  background,
  lessonsCount,
  duration,
  enrolledCount,
  language,
  startTime,
  endTime,
  teachingType,
}: CourseHeaderProps) => {
  const { t } = useTranslation()

  return (
    <Box position="relative">
      <HeaderBackgroundImage background={background} />

      <HeaderOverlay>
        <InstructorInfo>
          <InstructorAvatar
            src={instructorImage}
            alt={instructorName}
            sx={{ width: 60, height: 60 }}
          />
          <Stack>
            <InstructorTitle sx={{ color: 'white', fontSize: '20px' }}>
              {instructorName}
            </InstructorTitle>
            <InstructorJob sx={{ fontSize: 12, color: 'white' }}>
              {t('course.instructor')}
            </InstructorJob>
          </Stack>
        </InstructorInfo>

        <Typography
          variant="h1"
          sx={{ m: 2, fontSize: '40px', lineHeight: 1.2 }}>
          {title}
        </Typography>

        <HeaderDetail>
          <LabelWithIcon
            label={t('course.duration', { duration })}
            icon={<img src={timerIcon} />}
          />
          <LabelWithIcon
            label={t('course.enrolled_students', { count: enrolledCount })}
            icon={<img src={peopleIcon} />}
          />
          <LabelWithIcon
            label={t('course.number_of_lessons', { count: lessonsCount })}
            icon={<img src={courseIcon} />}
          />

          <LabelWithIcon
            label={language}
            icon={<img src={languageIcon} width={20} />}
          />
          {teachingType && (
            <Stack direction={'column'} gap={2}>
              <Stack direction={'row'} spacing={2}>
                <LabelWithIcon
                  label={transformDateTimeFormat(startTime)}
                  icon={<img src={calendar} width={25} />}></LabelWithIcon>
                <img src={arrow} width={50} />
                <LabelWithIcon
                  label={transformDateTimeFormat(endTime)}
                  icon={<img src={calendar} width={25} />}></LabelWithIcon>
              </Stack>
              <Button variant="contained" sx={{ width: '150px' }}>
                {teachingType && <Typography>{t(teachingType)}</Typography>}
              </Button>
            </Stack>
          )}
        </HeaderDetail>
      </HeaderOverlay>
    </Box>
  )
}

export default CourseHeader
