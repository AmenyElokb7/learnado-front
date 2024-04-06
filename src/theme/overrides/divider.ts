import { ThemeModeEnum } from '@config/enums/theme.enum'
import { Theme } from '@mui/material'

export default function divider(theme: Theme) {
  return {
    styleOverrides: {
      styleOverrides: {
        root: {
          borderColor:
            theme.palette.mode === ThemeModeEnum.DARK
              ? theme.palette.grey[800]
              : theme.palette.grey[200],
          opacity: 1,
        },
      },
    },
  }
}
