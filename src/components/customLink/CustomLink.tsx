import { CustomLinkProps } from './CustomLink.type'
import { CustomLinkRoot } from './customLink.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

const CustomLink = ({ to, label, isActive }: CustomLinkProps) => {
  return (
    <CustomLinkRoot
      to={to}
      isactive={
        isActive ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING
      }>
      {label}
    </CustomLinkRoot>
  )
}

export default CustomLink
