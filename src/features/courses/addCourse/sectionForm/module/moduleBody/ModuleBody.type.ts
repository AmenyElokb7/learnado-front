import { Dispatch, SetStateAction } from 'react'
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form'
import { Question } from 'types/models/Quiz'
import { FormValues } from '../Module.type'

export interface ModuleBodyProps {
  expanded: boolean
  index: number
  files: Record<number, File[]>
  isEditMode?: boolean
  externalUrls: {
    url: string
    title: string
  }[]
  hasQuiz: 1 | 0
  questions: Question[]
  field: FieldArrayWithId<FormValues, 'sections', 'id'>
  sectionFormMethods: UseFormReturn<FormValues, any, undefined>

  setFiles: Dispatch<SetStateAction<Record<number, File[]>>>
  handleAddExternalUrl: (index: number) => void
  handleRemoveExternalUrl: (index: number, externalUrlIndex: number) => void
  handleAddQuestion: (index: number) => void
  handleRemoveQuestion: (index: number, questionIndex: number) => void
  handleAddAnswer: (sectionIndex: number, questionIndex: number) => void
  handleRemoveAnswer: (
    sectionIndex: number,
    questionIndex: number,
    answerIndex: number,
  ) => void
}
