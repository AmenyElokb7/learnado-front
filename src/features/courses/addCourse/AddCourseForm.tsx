import { useState } from 'react'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { Divider, Stack } from '@mui/material'
import CustomStepper from '@components/CustomStepper/CustomStepper'
import { STEPS } from './AddCourseForm.constants'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import { GoBackButton } from './AddCourseForm.style'
import { useForm } from 'react-hook-form'
import { useCreateCourseMutation } from '@redux/apis/courses/coursesApi'
import { useAppDispatch } from '@redux/hooks'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'
import CourseForm from './courseForm/CourseForm'
import SectionForm from './sectionForm/SectionForm'
import { PATHS } from '@config/constants/paths'
import { useNavigate } from 'react-router-dom'
import { useCreateModuleMutation } from '@redux/apis/modules/moduleApi'
import { FormValues } from './sectionForm/module/Module.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { QuestionTypeEnum } from '@config/enums/questionType.enum'
export default function AddCourseForm() {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [files, setFiles] = useState<Record<number, File[]>>({})
  const [courseId, setCourseId] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(1)
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({})

  const StepperFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })
  const SectionFormMethods = useForm<FormValues>({
    mode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      sections: [
        {
          title: GLOBAL_VARIABLES.EMPTY_STRING,
          description: GLOBAL_VARIABLES.EMPTY_STRING,
          duration: GLOBAL_VARIABLES.EMPTY_STRING,
          hasQuiz: 0,
          externalUrls: [
            {
              url: GLOBAL_VARIABLES.EMPTY_STRING,
              title: GLOBAL_VARIABLES.EMPTY_STRING,
            },
          ],
          quiz: {
            questions: [
              {
                question: GLOBAL_VARIABLES.EMPTY_STRING,
                type: QuestionTypeEnum.BINARY,
                isValid: 0,
                answers: [
                  {
                    answer: GLOBAL_VARIABLES.EMPTY_STRING,
                    isValid: 0,
                  },
                  {
                    answer: GLOBAL_VARIABLES.EMPTY_STRING,
                    isValid: 0,
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  })

  //TODO: GET the Course by ID

  const [createCourseActionApi, { isLoading }] = useCreateCourseMutation()

  const [createSectionActionApi, { isLoading: isLoadingSection }] =
    useCreateModuleMutation()

  const handleAddCourse = StepperFormMethods.handleSubmit(async (values) => {
    try {
      const courseResponse = await createCourseActionApi(values).unwrap()
      setCourseId(String(courseResponse.data.course.id))
      dispatch(showSuccess(t('course.add_course_success')))
      setCompleted({ ...completed, [activeStep]: true })
      setActiveStep((prev) => prev + 1)
    } catch (error) {
      dispatch(showError(t('course.add_course_failure')))
    }
  })

  const handleAddSection = SectionFormMethods.handleSubmit(async (values) => {
    try {
      await createSectionActionApi({
        courseId: String(courseId),
        sections: values.sections,
        files,
      }).unwrap()
      dispatch(showSuccess(t('section.add_section_success')))
      navigate(PATHS.DASHBOARD.DESIGNER.MY_COURSES.ROOT)
    } catch (error) {
      dispatch(showError(t('section.add_section_failure')))
    }
  })

  const handleGoBack = () => setActiveStep((prev) => prev - 1)

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CourseForm formMethods={StepperFormMethods} />
      case 1:
        return (
          <SectionForm
            setFiles={setFiles}
            files={files}
            sectionFormMethods={SectionFormMethods}
          />
        )
      default:
        return <CourseForm formMethods={StepperFormMethods} />
    }
  }

  return (
    <Box>
      <CustomStepper
        steps={STEPS}
        activeStep={activeStep}
        completed={completed}
      />
      {/* Stepper Content */}

      {renderStepContent(activeStep)}

      <Divider />
      {/* Stepper Buttons */}
      <Stack
        mt={2}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <GoBackButton disabled={activeStep === 0} onClick={handleGoBack}>
          {t('common.back')}
        </GoBackButton>
        <Stack>
          <CustomLoadingButton
            isLoading={isLoading || isLoadingSection}
            onClick={activeStep === 0 ? handleAddCourse : handleAddSection}>
            {t('common.next')}
          </CustomLoadingButton>
        </Stack>
      </Stack>
    </Box>
  )
}
