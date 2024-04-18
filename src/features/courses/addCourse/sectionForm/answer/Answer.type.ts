import { InputConfig } from 'types/interfaces/InputConfig'

export interface AnswerProps {
  answerTitleConfig: InputConfig
  answerIsValidConfig: InputConfig
  index: number

  questionIndex: number
  answerIndex: number
  handleRemoveAnswer: (
    index: number,
    questionIndex: number,
    answerIndex: number,
  ) => void
}
