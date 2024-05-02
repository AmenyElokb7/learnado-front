import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'

export interface CourseMediaDetailsProps {
  open: boolean
  scroll: 'paper' | 'body' | undefined
  onClose: () => void
  section: Section
}
