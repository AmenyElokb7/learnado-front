import {
  StatsCardRoot,
  StatsTypography,
  StyledCardImage,
} from './statisticsCard.style'
import { StatsticsCardProps } from './statisticsCard.type'

export default function StatsticsCard({
  image,
  number,
  label,
}: StatsticsCardProps) {
  return (
    <StatsCardRoot>
      <StyledCardImage src={image} alt={label} />
      <StatsTypography variant="h5">{number}</StatsTypography>
      <StatsTypography>{label}</StatsTypography>
    </StatsCardRoot>
  )
}
