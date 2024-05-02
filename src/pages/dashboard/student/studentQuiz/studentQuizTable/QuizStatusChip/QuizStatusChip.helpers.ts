import { LIGHT_COLORS } from '@config/colors/colors'
import { QuizStatusColorProps } from './QuizStatusChip.type'

export const getQuizStatusChipColor = (
  status: 0 | 1 | undefined,
): QuizStatusColorProps => {
  let quizStatusColor: QuizStatusColorProps = {
    label: getQuizStatus(status || 0),
    color: 'primary',
    background: LIGHT_COLORS.primary.light,
  }
  switch (status) {
    case 1:
      quizStatusColor = {
        ...quizStatusColor,
        color: 'success',
        background: '#D0FFE1',
      }
      break

    case 0:
      quizStatusColor = {
        ...quizStatusColor,
        color: 'error',
        background: '#FFF0F3',
      }
      break
    default:
      quizStatusColor = {
        label: getQuizStatus(status || 0),
        color: 'primary',
        background: LIGHT_COLORS.primary.light,
      }
  }
  return quizStatusColor
}

export const getQuizStatus = (passed: 0 | 1): string => {
  if (passed) return 'section.quiz.success'
  return 'section.quiz.fail'
}
