import { Typography } from "@mui/material";

import { StyledCard, StyledCardImage } from "./CategoryCard.style";
import { CategoryCardProps } from "./CategoryCard.type";

function CategoryCard({ title, url, nbrOfLessons }: CategoryCardProps) {
  return (
    <StyledCard>
      <StyledCardImage src={url ?? ""} alt={title} />
      <Typography variant="h3" fontWeight="bold">
        {title}
      </Typography>
      <Typography variant="h6">{nbrOfLessons} Lessons</Typography>
    </StyledCard>
  );
}

export default CategoryCard;
