import CssBaseline from '@mui/material/CssBaseline'
import { useMemo } from 'react'
import { generateAppTheme } from './theme/theme'
import { useAppSelector } from './redux/hooks'
import { Routers } from './routes/Routers'
import { BrowserRouter } from 'react-router-dom'
import AppAlert from '@components/appAlert/AppAlert'
import { ThemeProvider } from '@mui/material'

function App() {
  const { mode } = useAppSelector((state) => state.theme)
  const theme = useMemo(() => generateAppTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppAlert />
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
