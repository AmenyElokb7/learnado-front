import { FieldArrayWithId, UseFormReturn } from 'react-hook-form'
import { FormValues } from '../module/Module.type'

export interface QuestionProps {
  field: FieldArrayWithId<FormValues, 'sections', 'id'>
  questionIndex: number
  sectionIndex: number

  canDelete: boolean
  sectionFormMethods: UseFormReturn<FormValues, any, undefined>

  handleDeleteQuestion: (index: number, questionIndex: number) => void
  handleAddQuestion: (index: number) => void
  handleAddAnswer: (index: number, questionIndex: number) => void
  handleRemoveAnswer: (
    index: number,
    questionIndex: number,
    answerIndex: number,
  ) => void
}
