import { SetStateAction, Dispatch } from 'react'
import { FieldArrayWithId, UseFormReturn } from 'react-hook-form'
import { Quiz } from 'types/models/Quiz'

export interface ModuleProps {
  sectionFormMethods: UseFormReturn<FormValues, any, undefined>
  files: Record<number, File[]>
  index: number
  canDelete: boolean
  field: FieldArrayWithId<FormValues, 'sections', 'id'>
  isEditMode?: boolean
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
  handleAddExternalUrl: (index: number) => void
  handleRemoveExternalUrl: (index: number, externalUrlIndex: number) => void
  handleAddSectionApi?: () => void
  handleRemoveQuiz?: (index: number) => void
}

export interface Section {
  databaseId?: number
  title: string
  description: string
  duration: number
  hasQuiz: 1 | 0
  quiz: Quiz
  externalUrls?: {
    id: number
    url: string
    title: string
  }[]
  media?: {
    id: number
    modelId: number
    fileName: string
    title: string
    mimeType: string
  }[]
}
export interface FormValues {
  sections: Section[]
}
