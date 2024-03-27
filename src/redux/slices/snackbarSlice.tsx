import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alert } from 'types/interfaces/Alert'
import { ErrorAlertObject } from '@config/constants/alerts.constants'

interface SnackbarState {
  alert: Alert | null
}

const initialState: SnackbarState = {
  alert: {
    open: false,
    message: '',
    type: 'success',
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
          type: 'success',
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
      state.alert = null
    },
  },
})

export const { showSuccess, showError, clearSnackbarState } =
  snackbarSlice.actions

export default snackbarSlice.reducer
