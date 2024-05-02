import { styled } from '@mui/material'

export const InstructorCalendarContainer = styled('div')(({ theme }) => ({
  '& .fc-event-title': {
    whiteSpace: 'normal',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5px',
  },

  '& .fc-event': {
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '5px',
    margin: '5px',
  },
  '& .fc-event:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '& .fc-daygrid-event': {
    borderRadius: '5px',
  },
  '& .fc-event-time': {
    marginBottom: '4px',
  },
  
}))
