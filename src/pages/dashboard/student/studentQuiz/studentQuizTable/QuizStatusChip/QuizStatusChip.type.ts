import { MUIDefaultColors } from 'types/interfaces/MUI'

export interface QuizStatusProps {
  status: 0 | 1 | undefined
}

export type QuizStatusColorProps = {
  label: string
  color: MUIDefaultColors
  background: string
}
