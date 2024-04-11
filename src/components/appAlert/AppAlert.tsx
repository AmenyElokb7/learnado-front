import { Alert, Snackbar } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { clearSnackbarState } from '@redux/slices/snackbarSlice'

function AppAlert() {
  const dispatch = useAppDispatch()
  const { alert } = useAppSelector((state) => state.snackbar)

  const handleClose = () => {
    dispatch(clearSnackbarState())
  }
  return (
    <Snackbar
      open={alert?.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
      <Alert
        onClose={handleClose}
        severity={alert?.type}
        variant="filled"
        sx={{ width: '100%', color: 'white' }}>
        {alert?.message}
      </Alert>
    </Snackbar>
  )
}

export default AppAlert
