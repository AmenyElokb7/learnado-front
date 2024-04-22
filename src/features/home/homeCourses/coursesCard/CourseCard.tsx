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
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { DateRange } from '@mui/icons-material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import { useState } from 'react'
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions'
import { GREY } from '@config/colors/colors'
import { useAppDispatch } from '@redux/hooks'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'
import { useDeleteCourseMutation } from '@redux/apis/courses/coursesApi'
import trash from '@assets/logo/icon-trash.svg'

const CourseCard = ({
  id,
  image,
  instructorName,
  instructorAvatar,
  courseTitle,
  coursePrice,
  discount,
  hasDiscount,
  isPaid,
  lessonsCount,
  duration,
  createdAt,
  isInstructor,
  width,
}: CourseCardProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const [deleteCourse] = useDeleteCourseMutation()

  const dispatch = useAppDispatch()

  const handleDeleteCourse = async (id: number) => {
    try {
      deleteCourse(id).unwrap()
      dispatch(showSuccess(t('course.delete_course_success')))
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    } finally {
      setOpen(false)
    }
  }

  const navigateToCourseDetailPage = (id: number) => {
    return navigate(`${PATHS.COURSES.ROOT}/${id}`)
  }

  return (
    <CourseCardContainer
      onClick={() => !isInstructor && navigateToCourseDetailPage(id)}
      width={width || '55vh'}>
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mr={3}>
        <InstructorInfo>
          <InstructorAvatar src={instructorAvatar} alt={instructorName} />
          <Stack>
            <InstructorTitle>{instructorName}</InstructorTitle>
            <InstructorJob>{t('course.instructor')}</InstructorJob>
          </Stack>
        </InstructorInfo>
        <LabelWithIcon label={createdAt} icon={<DateRange />} />
      </Stack>

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

        {!isInstructor ? (
          <Stack alignItems="flex-end">
            <BuyButton variant="outlined" color="primary">
              {!isPaid ? t('home.enroll_button') : t('home.buy_button')}
            </BuyButton>
          </Stack>
        ) : (
          <Stack justifyContent={'space-between'} direction={'row'} p={1}>
            <LabelWithIcon
              onClick={() =>
                navigate(PATHS.DASHBOARD.DESIGNER.MY_COURSES.EDIT_COURSE)
              }
              label={t('common.edit')}
              icon={<EditNoteOutlinedIcon />}
            />
            <LabelWithIcon
              onClick={() => setOpen(true)}
              label={t('common.delete')}
              icon={<DeleteOutlineOutlinedIcon />}
            />
          </Stack>
        )}
        <CustomDialogActions
          open={open}
          onAccept={() => handleDeleteCourse(id)}
          onClose={() => setOpen(false)}
          onCancel={() => setOpen(false)}>
          <Stack direction={'column'} spacing={1} alignItems={'center'}>
            <img src={trash} width={100} />
            <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
              {t('course.delete_course')}
            </Typography>
            <Typography variant="h6" color={GREY.main}>
              {t('course.delete_course_confirm')}
            </Typography>
          </Stack>
        </CustomDialogActions>
      </CourseContent>
    </CourseCardContainer>
  )
}

export default CourseCard
