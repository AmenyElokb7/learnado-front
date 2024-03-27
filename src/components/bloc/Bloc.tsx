import { Stack } from '@mui/material'
import { BlocSectionProps } from './bloc.type'
import { BlocContainer } from './bloc.style'

function Bloc({ contentComponent, titleComponent }: BlocSectionProps) {
  return (
    <BlocContainer>
      {titleComponent}
      <Stack alignItems={'center'}>{contentComponent}</Stack>
    </BlocContainer>
  )
}

export default Bloc
