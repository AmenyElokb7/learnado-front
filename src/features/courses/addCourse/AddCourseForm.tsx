import { useState } from 'react'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import CreateCourseStep from './stepper/CreateCourseStep'
import CreateSectionStep from './stepper/CreateSectionStep'
import { Divider, Stack } from '@mui/material'
import CustomStepper from '@components/CustomStepper/CustomStepper'
import { STEPS } from './AddCourseForm.constants'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import { GoBackButton } from './AddCourseForm.style'
import { FormProvider, useForm } from 'react-hook-form'
import { useCreateCourseMutation } from '@redux/apis/courses/coursesApi'
import { useAppDispatch } from '@redux/hooks'
import { showSuccess } from '@redux/slices/snackbarSlice'
export default function AddCourseForm() {
  const { t } = useTranslation()

  const [activeStep, setActiveStep] = useState(1)
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({})

  const StepperFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })

  const dispatch = useAppDispatch()

  const [createCourseActionApi, { isLoading }] = useCreateCourseMutation()

  const handleNext = StepperFormMethods.handleSubmit(async (values) => {
    try {
      // Check the active Step
      if (activeStep === 0) {
        // Create Course api call
        await createCourseActionApi(values).unwrap()
        dispatch(showSuccess(t('users.add_course_success')))
        // Increment the active step
        setCompleted({ ...completed, [activeStep]: true })
        setActiveStep((prev) => prev + 1)
      } else if (activeStep === 1) {
        // Create Module api call
        // Navigate the user to the course page
      }
    } catch (error) {
      // error handling
    }
  })

  const handleGoBack = () => setActiveStep((prev) => prev - 1)

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <CreateCourseStep formMethods={StepperFormMethods} />
      case 1:
        return <CreateSectionStep />
      default:
        return <CreateCourseStep formMethods={StepperFormMethods} />
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
      <FormProvider {...StepperFormMethods}>
        {renderStepContent(activeStep)}
      </FormProvider>
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
          <CustomLoadingButton isLoading={isLoading} onClick={handleNext}>
            {t('common.next')}
          </CustomLoadingButton>
        </Stack>
      </Stack>
    </Box>
  )
}
