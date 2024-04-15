import { MUIDefaultColors } from 'types/interfaces/MUI'

export interface UserStatusProps {
  status: 0 | 1 | undefined
}

export type UserStatusColorProps = {
  label: string
  color: MUIDefaultColors
}
