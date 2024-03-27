import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from './slices/snackbarSlice'
import themeReducer from './slices/theme'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    snackbar: snackbarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
