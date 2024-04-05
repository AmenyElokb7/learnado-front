import Alert from '@mui/material/Alert'
import { CustomAlertProps } from './customAlert.type'
import { useState } from 'react'

const CustomAlert = ({ severity, message, onClose }: CustomAlertProps) => {
  return (
    <>
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </>
  )
}
export default CustomAlert
