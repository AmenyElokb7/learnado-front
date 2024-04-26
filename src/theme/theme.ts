import { PaletteMode, createTheme } from '@mui/material'
import overridesMUIComponents from './overrides'
import { LIGHT_THEME } from './theme.light'
import { DARK_THEME } from './theme.dark'

export const generateAppTheme = (mode: PaletteMode) => {
  switch (mode) {
    case 'dark':
      const darkThemeApp = createTheme(DARK_THEME)

      darkThemeApp.components = overridesMUIComponents(darkThemeApp)
      return darkThemeApp

    case 'light':
      const lightThemeApp = createTheme(LIGHT_THEME)
      lightThemeApp.components = overridesMUIComponents(lightThemeApp)

      return lightThemeApp
  }
}
