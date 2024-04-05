import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum'
import { authApi } from '@redux/apis/auth/authApi'
import { RootState } from '@redux/store'
import { createSlice } from '@reduxjs/toolkit'
import { decodeToken } from '@utils/localStorage/decodeToken'
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          const decodedToken = decodeToken(payload.data.accessToken)
          state.user = decodedToken
          state.isAuthenticated = true
          setToLocalStorage(
            LocalStorageKeysEnum.AccessToken,
            payload.data.accessToken,
          )
          setToLocalStorage(
            LocalStorageKeysEnum.RefreshToken,
            payload.data.refreshToken,
          )
        },
      )

      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        removeFromLocalStorage(LocalStorageKeysEnum.AccessToken)
      })
  },
})
export const selectAuth = (state: RootState) => state.auth
export const { logout } = authSlice.actions
export default authSlice.reducer
