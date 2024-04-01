// statisticsCard.style.ts
import { styled } from '@mui/material/styles'
import { Card, Typography } from '@mui/material'

export const ServiceCardRoot = styled(Card)(({ theme }) => ({
  marginLeft: theme.spacing(3),
}))

export const ServiceTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}))

export const StyledCardImage = styled('img')({
  marginBottom: 16, // Adjust to match design
})
