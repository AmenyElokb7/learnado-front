import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import {
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { QuestionProps } from './Question.type'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton'
import CustomSelectField from '@components/Inputs/customSelectField/CustomSelectField'
import { BLUE } from '@config/colors/colors'
import Answer from '../answer/Answer'
import { CREATE_STEP_FORM_CONFIG } from '../SectionForm.constants'
import { QuestionTypeEnum } from '@config/enums/questionType.enum'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

function Question({
  questionIndex,
  sectionIndex,
  canDelete,
  field,
  sectionFormMethods,
  handleDeleteQuestion,
  handleAddAnswer,
  handleRemoveAnswer,
}: QuestionProps) {
  const { t } = useTranslation()
  // Question to be submitted to the api after the update
  const questionToUpdate = sectionFormMethods.watch(
    `sections.${sectionIndex}.quiz.questions.${questionIndex}`,
  )

  const isBinary = questionToUpdate
    ? questionToUpdate.type === QuestionTypeEnum.BINARY
    : false
  const answers = field.quiz ? field.quiz.questions[questionIndex].answers : []

  return (
    <Stack spacing={1} sx={{ boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)' }}>
      <Stack alignSelf={'flex-end'}>
        <Tooltip title={t('section.quiz.remove_question')}>
          <IconButton
            disabled={!canDelete}
            sx={{
              color: (theme) =>
                canDelete
                  ? theme.palette.error.main
                  : theme.palette.action.disabled,
            }}
            onClick={() => handleDeleteQuestion(sectionIndex, questionIndex)}>
            <DeleteOutlineOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Grid container alignItems={'center'}>
        <Grid item xs={12} lg={3}>
          <Typography color={BLUE.main} fontWeight={'medium'} variant="h4">
            {t('section.quiz.question')}
          </Typography>
        </Grid>

        <Grid item xs={12} lg={8}>
          <CustomTextField
            config={{
              ...CREATE_STEP_FORM_CONFIG.questionTitle,
              name: `sections.${sectionIndex}.quiz.questions.${questionIndex}.question`,
            }}
          />
        </Grid>
      </Grid>

      <Grid container alignItems={'center'}>
        <Grid item xs={12} lg={3}>
          <Typography color={BLUE.main} fontWeight={'medium'} variant="h4">
            {t('section.quiz.question_type')}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8}>
          <CustomSelectField
            config={{
              ...CREATE_STEP_FORM_CONFIG.questionType,
              name: `sections.${sectionIndex}.quiz.questions.${questionIndex}.type`,
            }}
          />
        </Grid>
      </Grid>
      {!isBinary ? (
        <Stack p={4}>
          <Grid item xs={12} lg={4}>
            <Stack direction={'row'} spacing={4}>
              <Typography color={'primary'} fontWeight={'medium'} variant="h2">
                {t('section.quiz.answers')}
              </Typography>
              <Tooltip title={t('section.quiz.add_answer')}>
                <IconButton
                  onClick={() => handleAddAnswer(sectionIndex, questionIndex)}
                  color="success">
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
          {answers?.map((_, answerIndex) => (
            <Grid item xs={12} key={answerIndex}>
              <Answer
                sectionIndex={sectionIndex}
                questionIndex={questionIndex}
                answerIndex={answerIndex}
                handleRemoveAnswer={handleRemoveAnswer}
              />
            </Grid>
          ))}
        </Stack>
      ) : (
        <Grid container alignItems={'center'}>
          <Grid item xs={12} lg={3}>
            <Typography color={BLUE.main} fontWeight={'medium'} variant="h4">
              {t('section.quiz.question_isValid')}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={7}>
            <CustomRadioButton
              config={{
                ...CREATE_STEP_FORM_CONFIG.questionIsValid,
                name: `sections.${sectionIndex}.quiz.questions.${questionIndex}.isValid`,
              }}
            />
          </Grid>
        </Grid>
      )}
      <Divider />
    </Stack>
  )
}

export default Question
