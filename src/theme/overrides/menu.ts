import { Theme } from '@mui/material'

export default function menu(theme: Theme) {
  return {
    MuiMenu: {
      defaultProps: {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
      },
      styleOverrides: {
        root: {
          background: theme.palette.common.white,
          borderRadius: '10px',
          padding: theme.spacing(2),
        },
      },
    },
  }
}
