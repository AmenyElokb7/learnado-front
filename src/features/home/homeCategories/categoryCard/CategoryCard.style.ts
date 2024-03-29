import { styled, Box } from '@mui/material'
import { GREY } from '@config/colors/colors'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

export const StyledCard = styled(Box)(
  ({ theme }) =>
    ({ isloading }: { isloading: string }) => ({
      width: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '15px',
      padding: '20px',
      background: theme.palette.common.white,
      margin: theme.spacing(2),
      borderRadius: theme.spacing(2),
      border: `1px solid ${GREY.light}`,
      cursor: 'pointer',
      '&:hover': {
        background:
          isloading === GLOBAL_VARIABLES.TRUE_STRING
            ? theme.palette.common.white
            : theme.palette.primary.dark,
        color: theme.palette.common.white,
      },
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
      },
    }),
)

export const StyledCardImage = styled('img')(({ theme }) => ({
  width: '150px',
  height: '150px',
  [theme.breakpoints.down('sm')]: {
    width: '50px',
  },
  [theme.breakpoints.down('md')]: {
    width: '100px',
  },
}))
