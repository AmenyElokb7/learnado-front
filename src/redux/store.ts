import { authApi } from '@redux/apis/auth/authApi'
import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from './slices/snackbarSlice'
import themeReducer from './slices/theme'
import { categoriesApi } from './apis/categories/categoriesApi'
import { courseApi } from './apis/courses/coursesApi'
import searchQueryReducer from './slices/appSlice'
import { userApi } from './apis/user/usersApi'
import authReducer from './slices/authSlice'
import { languagesApi } from './apis/languages/languagesApi'

export const store = configureStore({
  reducer: {
    appSlice: searchQueryReducer,
    theme: themeReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [languagesApi.reducerPath]: languagesApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      languagesApi.middleware,
      courseApi.middleware,
      userApi.middleware,
      authApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
