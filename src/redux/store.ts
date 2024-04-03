import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from './slices/snackbarSlice'
import themeReducer from './slices/theme'
import { categoriesApi } from './apis/categories/categoriesApi'
import { courseApi } from './apis/courses/coursesApi'
import searchQueryReducer from './slices/appSlice'
import { userApi } from './apis/auth/usersApi'

export const store = configureStore({
  reducer: {
    appSlice: searchQueryReducer,
    theme: themeReducer,
    snackbar: snackbarReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      courseApi.middleware,
      userApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
