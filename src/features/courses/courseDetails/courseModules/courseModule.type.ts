import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'

export interface CourseModuleProps {
  title: string
  media: {
    id: number
    modelId: number
    fileName: string
    title: string
    mimeType: string
  }[]
  duration: number
  section: Section
  courseId?: string
  sectionId?: number
  quiz?: {
    questions: {
      id: number
      question: string
      type: number
      isValid: boolean
      answers: {
        id: number
        answer: string
        isValid: boolean
      }[]
    }[]
  }
}
