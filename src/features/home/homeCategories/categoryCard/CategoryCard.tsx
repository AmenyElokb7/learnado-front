import { Typography } from '@mui/material'

import { StyledCard, StyledCardImage } from './CategoryCard.style'
import { CategoryCardProps } from './CategoryCard.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function CategoryCard({ title, url, nbrOfLessons }: CategoryCardProps) {
  return (
    <StyledCard isloading={GLOBAL_VARIABLES.FALSE_STRING}>
      <StyledCardImage src={url ?? GLOBAL_VARIABLES.EMPTY_STRING} alt={title} />
      <Typography variant="h3" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="h6">{nbrOfLessons} Lessons</Typography>
    </StyledCard>
  )
}

export default CategoryCard
