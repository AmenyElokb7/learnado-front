import {
  RectangularCardRoot,
  RectangularCardTitle,
} from './RectangularCard.style'
import { RectangularCardProps } from './RectangularCard.type'

function RectangularCard({ title, children }: RectangularCardProps) {
  return (
    <RectangularCardRoot>
      <RectangularCardTitle>{title}</RectangularCardTitle>
      {children}
    </RectangularCardRoot>
  )
}

export default RectangularCard
