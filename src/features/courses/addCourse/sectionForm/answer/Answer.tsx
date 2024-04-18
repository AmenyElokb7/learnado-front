import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { AnswerProps } from './Answer.type'
import CustomCheckboxButton from '@components/Inputs/customCheckboxButton/CustomCheckboxButton'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useTranslation } from 'react-i18next'

function Answer({
  answerTitleConfig,
  answerIsValidConfig,
  index,
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
            <CustomCheckboxButton config={answerIsValidConfig} />
          </IconButton>
        </Tooltip>
      </Grid>

      <Grid item xs={12} lg={10}>
        <CustomTextField config={answerTitleConfig} />
      </Grid>
      <Grid item xs={12} lg={1}>
        <Tooltip title={t('section.quiz.remove_answer')}>
          <IconButton
            onClick={() =>
              handleRemoveAnswer(index, questionIndex, answerIndex)
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
