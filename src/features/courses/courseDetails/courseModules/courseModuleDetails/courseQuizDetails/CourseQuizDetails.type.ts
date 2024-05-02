import { Section } from '@features/courses/addCourse/sectionForm/module/Module.type'

export interface CustomQuizDetailsProps {
  open: boolean
  onClose: () => void
  section: Section
}
