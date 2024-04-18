import { SetStateAction, Dispatch } from 'react'
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form'
import { Quiz } from 'types/models/Quiz'

export interface ModuleProps {
  sectionFormMethods: UseFormReturn<FormValues, any, undefined>
  files: Record<number, File[]>
  index: number
  canDelete: boolean
  field: FieldArrayWithId<FormValues, 'sections', 'id'>
  setFiles: Dispatch<SetStateAction<Record<number, File[]>>>
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void
  handleAddQuestion: (index: number) => void
  handleRemoveQuestion: (index: number, questionIndex: number) => void
  handleAddAnswer: (sectionIndex: number, questionIndex: number) => void
  handleRemoveAnswer: (
    sectionIndex: number,
    questionIndex: number,
    answerIndex: number,
  ) => void
  handleRemoveModule: (index: number) => void
}

export interface Section {
  title: string
  description: string
  duration: string
  hasQuiz: 1 | 0
  quiz: Quiz
}
export interface FormValues {
  sections: Section[]
}
