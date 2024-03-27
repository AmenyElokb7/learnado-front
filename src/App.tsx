import { useMemo } from 'react'

import { generateAppTheme } from './theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useAppSelector } from './redux/hooks'
import { Routers } from './routes/Routers'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const { mode } = useAppSelector((state) => state.theme)
  const theme = useMemo(() => generateAppTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
