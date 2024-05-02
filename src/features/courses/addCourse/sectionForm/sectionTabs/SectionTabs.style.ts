import { Add } from '@mui/icons-material'
import { Tabs, alpha, styled } from '@mui/material'

export const SectionTabsRoot = styled(Tabs)(({ theme }) => ({
  '& .MuiButtonBase-root.MuiTab-root': {
    borderRadius: '15px',
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '0 20px',
    color: theme.palette.primary.main,
    textTransform: 'none',
    fontWeight: 500,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    margin: '10px',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.3),
    },
    '& svg': {
      fill: theme.palette.grey[500],
    },
  },
  '& .MuiButtonBase-root.MuiTab-root.Mui-selected': {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
}))

export const AddNewSectionIcon = styled(Add)(({ theme }) => ({
  height: '35px',
  width: '35px',
  fill: theme.palette.primary.main,
  borderRadius: '50%',
  border: `1px solid ${theme.palette.primary.main}`,
  cursor: 'pointer',
  padding: '5px',
  '&: hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
}))
