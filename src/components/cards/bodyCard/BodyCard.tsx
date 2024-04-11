import { Button, Divider, Stack } from '@mui/material'
import {
  StyledBodyCardContent,
  StyledBodyCardRoot,
  StyledBodyCardTitle,
} from './BodyCard.style'
import { BodyCardProps } from './BodyCard.type'

function BodyCard({ children, title, onClick, buttonText }: BodyCardProps) {
  return (
    <StyledBodyCardRoot>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        width={'100%'}
        alignItems={'center'}>
        <StyledBodyCardTitle>{title}</StyledBodyCardTitle>
        {onClick && (
          <Button
            sx={{ marginRight: '20px' }}
            variant="outlined"
            onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </Stack>

      <StyledBodyCardContent>
        <Divider />
        <Stack padding={2} direction={'column'} spacing={2}>
          {children}
        </Stack>
      </StyledBodyCardContent>
    </StyledBodyCardRoot>
  )
}

export default BodyCard
