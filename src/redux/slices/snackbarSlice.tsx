import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alert } from 'types/interfaces/Alert'
import { ErrorAlertObject } from '@config/constants/alerts.constants'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { AlertType } from '@config/enums/alertType.enum'

interface SnackbarState {
  alert: Alert | null
}

const initialState: SnackbarState = {
  alert: {
    open: false,
    message: GLOBAL_VARIABLES.EMPTY_STRING,
    type: AlertType.SUCCESS,
  },
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSuccess: (state, action: PayloadAction<string>) => {
      if (state.alert) {
        state.alert = {
          ...state.alert,
          open: true,
          message: action.payload,
          type: AlertType.SUCCESS,
        }
      }
    },

    showError: (state, action: PayloadAction<string>) => {
      if (state.alert) {
        state.alert = {
          ...ErrorAlertObject,
          message: action.payload,
        }
      }
    },
    clearSnackbarState: (state) => {
      state.alert = {
        open: false,
        message: GLOBAL_VARIABLES.EMPTY_STRING,
        type: AlertType.SUCCESS,
      }
    },
  },
})

export const { showSuccess, showError, clearSnackbarState } =
  snackbarSlice.actions

export default snackbarSlice.reducer
