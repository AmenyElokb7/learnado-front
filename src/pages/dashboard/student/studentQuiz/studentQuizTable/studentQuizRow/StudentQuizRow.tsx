import { PATHS } from '@config/constants/paths'
import { TableRow, TableCell, Tooltip, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { StudentQuizRowProps } from './StudentQuizRow.type'
import QuizStatusChip from '../QuizStatusChip/QuizStatusChip'
import { BLUE, GREY } from '@config/colors/colors'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useTranslation } from 'react-i18next'

function StudentQuizRow({ quiz }: StudentQuizRowProps) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const navigateToUserDetailPage = (id: number) => {
    return navigate(`${PATHS.COURSES}/${id}`)
  }

  function calculateScorePercentage() {
    const scorePercentage = (quiz.score / quiz.totalScorePossible) * 100
    return scorePercentage % 1 !== 0
      ? scorePercentage.toFixed(2)
      : scorePercentage
  }
  return (
    <TableRow key={quiz.id}>
      <TableCell>
        <Typography color={GREY.main} mb={2}>
          {quiz.createAt}
        </Typography>
        <Tooltip title={quiz.quiz.step.title}>
          <Stack direction={'row'} spacing={1}>
            <Typography color={GREY.main}>{t('section.quiz.quiz')}</Typography>
            <ErrorOutlineIcon
              fontSize="small"
              sx={{ cursor: 'pointer', color: GREY.main }}
            />
          </Stack>
        </Tooltip>
      </TableCell>

      <TableCell
        sx={{
          cursor: 'pointer',
          color: BLUE.main,
          fontWeight: 'medium',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
        onClick={() => navigateToUserDetailPage(quiz.quiz.step.course.id)}>
        {quiz.quiz.step.course.title}
      </TableCell>

      <TableCell>{quiz.totalScorePossible}</TableCell>
      <TableCell>{quiz.score}</TableCell>
      <TableCell>{quiz.totalScorePossible}</TableCell>
      <TableCell>{calculateScorePercentage()} %</TableCell>
      <TableCell>
        <QuizStatusChip status={quiz.passed ? 1 : 0} />
      </TableCell>
    </TableRow>
  )
}

export default StudentQuizRow
