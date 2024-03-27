import { TitleStyled } from './title.style'
import { TitleProps } from './title.type'

function Title({ children }: TitleProps) {
  return <TitleStyled>{children}</TitleStyled>
}

export default Title
