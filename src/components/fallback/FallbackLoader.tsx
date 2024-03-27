import CircularProgress from '@mui/material/CircularProgress'
import { LoaderContainer } from './fallbackLoader.style'

const FallbackLoader = () => {
  return (
    <LoaderContainer>
      <CircularProgress />
    </LoaderContainer>
  )
}

export default FallbackLoader
