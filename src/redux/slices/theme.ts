import { PaletteMode } from '@mui/material'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ThemeModeEnum } from '@config/enums/theme.enum'

interface ThemeSlice {
  mode: PaletteMode
  isDarkMode: boolean
}

const INITIAL_SATATE: ThemeSlice = {
  mode: ThemeModeEnum.LIGHT,
  isDarkMode: false,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: INITIAL_SATATE,
  reducers: {
    changeTheme: (state, action: PayloadAction<PaletteMode>) => {
      state.mode = action.payload
      state.isDarkMode = action.payload === ThemeModeEnum.DARK
    },
  },
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
