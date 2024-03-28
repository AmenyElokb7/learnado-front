import { Alert } from 'types/interfaces/Alert'
import { GLOBAL_VARIABLES } from './globalVariables'
import { AlertType } from '@config/enums/alertType.enum'

export const SuccessAlertObject: Alert = {
  open: true,
  type: AlertType.SUCCESS,
  message: GLOBAL_VARIABLES.EMPTY_STRING,
}

export const ErrorAlertObject: Alert = {
  open: true,
  type: AlertType.ERROR,
  message: GLOBAL_VARIABLES.EMPTY_STRING,
}
