import { configureStore } from '@reduxjs/toolkit'
import snackbarReducer from './slices/snackbarSlice'
import themeReducer from './slices/theme'
import { categoriesApi } from './apis/categories/categoriesApi'
import { courseApi } from './apis/courses/coursesApi'
import searchQueryReducer from './slices/appSlice'

export const store = configureStore({
  reducer: {
    searchQuery: searchQueryReducer,
    theme: themeReducer,
    snackbar: snackbarReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoriesApi.middleware,
      courseApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
