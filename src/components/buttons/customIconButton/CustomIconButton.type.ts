import { ReactNode } from 'react'
import { MUIDefaultColors, MUIDefaultSizes } from 'types/interfaces/MUI'
import { SxProps } from '@mui/material'

export interface CustomIconButtonProps {
  color: MUIDefaultColors
  children: ReactNode
  size?: MUIDefaultSizes
  onClick?: () => void
  sx?: SxProps
}
