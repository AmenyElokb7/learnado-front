import { Button, Divider, Stack } from '@mui/material'
import {
  StyledBodyCardContent,
  StyledBodyCardRoot,
  StyledBodyCardTitle,
} from './BodyCard.style'
import { BodyCardProps } from './BodyCard.type'

function BodyCard({ children, title, onClick, button }: BodyCardProps) {
  return (
    <StyledBodyCardRoot>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        width={'100%'}
        
        alignItems={'center'}>
        <StyledBodyCardTitle>{title}</StyledBodyCardTitle>
        <Button sx={{marginRight:"20px"}} variant="outlined" onClick={onClick}>
          {button}
        </Button>
      </Stack>
      <StyledBodyCardContent>
        <Divider />
        {children}
      </StyledBodyCardContent>
    </StyledBodyCardRoot>
  )
}

export default BodyCard
