import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { AnswerProps } from './Answer.type'
import CustomCheckboxButton from '@components/Inputs/customCheckboxButton/CustomCheckboxButton'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useTranslation } from 'react-i18next'
import { CREATE_STEP_FORM_CONFIG } from '../SectionForm.constants'

function Answer({
  sectionIndex,
  questionIndex,
  answerIndex,
  handleRemoveAnswer,
}: AnswerProps) {
  const { t } = useTranslation()
  return (
    <Grid container display={'flex'} alignItems={'center'}>
      <Grid item xs={12} lg={1}>
        <Tooltip title={t('section.quiz.correct_answer')}>
          <IconButton>
            <CustomCheckboxButton
              config={{
                ...CREATE_STEP_FORM_CONFIG.answerIsValid,
                name: `sections.${sectionIndex}.quiz.questions.${questionIndex}.answers.${answerIndex}.isValid`
              }}
            />
          </IconButton>
        </Tooltip>
      </Grid>

      <Grid item xs={12} lg={10}>
        <CustomTextField
          config={{
            ...CREATE_STEP_FORM_CONFIG.answerTitle,
            name: `sections.${sectionIndex}.quiz.questions.${questionIndex}.answers.${answerIndex}.answer`,
          }}
        />
      </Grid>
      <Grid item xs={12} lg={1}>
        <Tooltip title={t('section.quiz.remove_answer')}>
          <IconButton
            onClick={() =>
              handleRemoveAnswer(sectionIndex, questionIndex, answerIndex)
            }
            color="error">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default Answer
