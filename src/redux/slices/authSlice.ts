import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum'
import { authApi } from '@redux/apis/auth/authApi'
import { RootState } from '@redux/store'
import { createSlice } from '@reduxjs/toolkit'
import {
  getUserFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from '@utils/localStorage/storage'

const initialState = {
  user: getUserFromLocalStorage(),
  isAuthenticated: !!getUserFromLocalStorage(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      removeFromLocalStorage(LocalStorageKeysEnum.AccessToken)
      removeFromLocalStorage(LocalStorageKeysEnum.RefreshToken)
      removeFromLocalStorage(LocalStorageKeysEnum.User)
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          const { accessToken, refreshToken, user } = payload.data
          state.user = user
          state.isAuthenticated = true
          setToLocalStorage(LocalStorageKeysEnum.AccessToken, accessToken)
          setToLocalStorage(LocalStorageKeysEnum.RefreshToken, refreshToken)
          setToLocalStorage(LocalStorageKeysEnum.User, JSON.stringify(user))
        },
      )

      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        removeFromLocalStorage(LocalStorageKeysEnum.AccessToken)
        removeFromLocalStorage(LocalStorageKeysEnum.RefreshToken)
        removeFromLocalStorage(LocalStorageKeysEnum.User)
      })
  },
})
export const selectAuth = (state: RootState) => state.auth
export const { logout } = authSlice.actions
export default authSlice.reducer
