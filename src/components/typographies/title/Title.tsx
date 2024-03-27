import { TitleStyled } from "./title.style";
import { TitleProps } from "./title.type";

const Title = ({ content, ...props }: TitleProps) => (
  <TitleStyled {...props}>{content}</TitleStyled>
);

export default Title;
