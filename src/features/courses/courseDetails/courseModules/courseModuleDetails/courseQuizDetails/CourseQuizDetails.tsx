import CustomFullScreenDialog from '@components/dialogs/customFullScreenDialog/CustomFullScreenDialog'
import { CustomQuizDetailsProps } from './CourseQuizDetails.type'
import { List, ListItem, Stack, Typography } from '@mui/material'
import { GREY } from '@config/colors/colors'
import { FormProvider, useForm } from 'react-hook-form'
import { QUIZ_FORM_CONFIG } from './CourseQuizDetails.constants'
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton'
import { useTranslation } from 'react-i18next'
import { useSubmitQuizMutation } from '@redux/apis/modules/moduleApi'
import CustomCheckboxButtonWithValue from '@components/Inputs/customCheckboxButton/CustomCheckboxButtonWithValue'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import { useAppDispatch } from '@redux/hooks'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'

function CourseQuizDetails({ onClose, open, section }: CustomQuizDetailsProps) {
  const quizFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })

  const { t } = useTranslation()
  const quiz = section?.quiz
  const dispatch = useAppDispatch()

  const quizId = section.quiz?.id

  const [submitQuiz, { isLoading }] = useSubmitQuizMutation()

  const onSubmit = quizFormMethods.handleSubmit(async (values) => {
    console.log('first', section?.quiz?.id)
    console.log('values: ', values)

    try {
      await submitQuiz({ quizId, data: values })
      onClose()
      dispatch(showSuccess(t('course.quiz_submitted')))
    } catch (error) {
      dispatch(showError(t('common.error')))
    }
  })

  return (
    <CustomFullScreenDialog open={open} handleClose={onClose}>
      <Stack direction={'column'} spacing={4}>
        <FormProvider {...quizFormMethods}>
          {quiz?.questions &&
            quiz?.questions.map((question, questionIndex) => (
              <Stack
                key={questionIndex}
                sx={{ boxShadow: '0px 0px 5px 0px #0f0f0f', borderRadius: 2 }}
                p={4}>
                <Typography
                  fontWeight={'medium'}
                  fontSize={'20px'}
                  color={GREY.dark}>
                  {question.question}
                </Typography>
                <List>
                  {question.answers.length > 0 ? (
                    question.answers.map((answer, answerIndex) => (
                      <ListItem key={answerIndex}>
                        <Stack
                          direction={'row'}
                          alignItems={'center'}
                          padding={1}
                          spacing={2}>
                          <CustomCheckboxButtonWithValue
                            config={{
                              ...QUIZ_FORM_CONFIG.answer,
                              name: `answers[${question.id}].answer`,
                              options: [
                                {
                                  label: answer.answer,
                                  value: String(answer?.id),
                                },
                              ],
                            }}
                          />
                        </Stack>
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <Stack alignItems={'center'} padding={1} spacing={2}>
                        <CustomRadioButton
                          config={{
                            ...QUIZ_FORM_CONFIG.answer,
                            name: `answers[${question.id}].answer`,
                            options: [
                              { label: t('common.yes'), value: 1 },
                              { label: t('common.no'), value: 2 },
                            ],
                          }}
                        />
                      </Stack>
                    </ListItem>
                  )}
                </List>
              </Stack>
            ))}
          <CustomLoadingButton isLoading={isLoading} onClick={onSubmit}>
            {t('common.submit')}
          </CustomLoadingButton>
        </FormProvider>
      </Stack>
    </CustomFullScreenDialog>
  )
}

export default CourseQuizDetails
