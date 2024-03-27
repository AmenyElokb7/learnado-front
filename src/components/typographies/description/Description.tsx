import { DescriptionStyled } from './description.style'
import { DescriptionProps } from './description.type'

function Title({ children }: DescriptionProps) {
  return <DescriptionStyled>{children}</DescriptionStyled>
}

export default Title
