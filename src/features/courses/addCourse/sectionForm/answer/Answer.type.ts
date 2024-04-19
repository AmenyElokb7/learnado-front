export interface AnswerProps {
  sectionIndex: number

  questionIndex: number
  answerIndex: number
  handleRemoveAnswer: (
    index: number,
    questionIndex: number,
    answerIndex: number,
  ) => void
}
