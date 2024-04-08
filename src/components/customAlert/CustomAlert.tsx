import Alert from '@mui/material/Alert'
import { CustomAlertProps } from './customAlert.type'
import { useState } from 'react'

const CustomAlert = ({ severity, message }: CustomAlertProps) => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {open && (
        <Alert severity={severity} onClose={handleClose}>
          {message}
        </Alert>
      )}
    </>
  )
}
export default CustomAlert
