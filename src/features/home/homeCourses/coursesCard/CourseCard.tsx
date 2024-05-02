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
import {
  useCompleteCourseMutation,
  useDeleteCourseMutation,
  useEnrollCourseMutation,
} from '@redux/apis/courses/coursesApi'
import trash from '@assets/logo/icon-trash.svg'
import { getUserFromLocalStorage } from '@utils/localStorage/storage'
import { IError } from 'types/interfaces/Error'

const CourseCard = ({
  id,
  image,
  instructorName,
  instructorAvatar,
  courseTitle,
  coursePrice,
  discount,
  isPaid,
  isActive,
  lessonsCount,
  duration,
  createdAt,
  isDesigner,
  isInstructor,
  isEnrolled,
  isCompleted,
  width,
  navigateToEditCoursePage,
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
  const [enrollCourse] = useEnrollCourseMutation()
  const [completeCourse] = useCompleteCourseMutation()

  const handleEnroll = async (id: number) => {
    try {
      await enrollCourse(id).unwrap()
      dispatch(showSuccess(t('course.enroll_course_success')))
    } catch (error) {
      if ((error as IError).status === 403) {
        dispatch(showError(t('errors.forbidden_error')))
      } else {
        dispatch(showError(t('errors.general_error')))
      }
    }
  }
  const handleCompleteCourse = async (id: number) => {
    try {
      await completeCourse(id).unwrap()
      dispatch(showSuccess(t('course.complete_course_success')))
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    }
  }

  const handleButtonClick = () => {
    if (!user) {
      navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`)
      return
    }
    if (!isPaid) {
      if (!isEnrolled) {
        handleEnroll(id)
      } else if (!isCompleted) {
        handleCompleteCourse(id)
      }
    } else if (!isEnrolled) {
      // TODO:
      // Handling the buy operation
      // buy logic here
    }
  }
  const getButtonLabel = () => {
    if (!user || (isPaid && !isEnrolled)) {
      return t('home.buy_button')
    }
    if (!isPaid && !isEnrolled) {
      return t('home.enroll_button')
    }
    if (!isPaid && isEnrolled && !isCompleted) {
      return t('home.complete_button')
    }
    return GLOBAL_VARIABLES.EMPTY_STRING
  }
  const user = !!getUserFromLocalStorage()

  return (
    <CourseCardContainer width={width || '55vh'}>
      <CourseImageContainer
        onClick={() => !isDesigner && navigateToCourseDetailPage(id)}>
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

        {!isDesigner && !isInstructor && !(Number(isEnrolled) === 1) ? (
          <Stack alignItems="flex-end" sx={{ zIndex: 999 }}>
            <BuyButton
              onClick={handleButtonClick}
              variant="outlined"
              color="primary">
              {getButtonLabel()}
            </BuyButton>
          </Stack>
        ) : (
          <Stack justifyContent={'space-between'} direction={'row'} p={1}>
            {isDesigner && Number(isActive) === 0 && (
              <>
                <LabelWithIcon
                  onClick={() =>
                    navigateToEditCoursePage && navigateToEditCoursePage(id)
                  }
                  label={t('common.edit')}
                  icon={<EditNoteOutlinedIcon />}
                />
                <LabelWithIcon
                  onClick={() => setOpen(true)}
                  label={t('common.delete')}
                  icon={<DeleteOutlineOutlinedIcon />}
                />
              </>
            )}
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
