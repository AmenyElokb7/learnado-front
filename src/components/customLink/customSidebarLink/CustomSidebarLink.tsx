import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { CustomLinkProps } from '../CustomLink.type'
import { CustomSidebarLinkRoot } from './CustomSidebarLink.style'

const CustomSidebarLink = ({
  to,
  label,
  isActive,
  onClick,
}: CustomLinkProps) => {
  return (
    <CustomSidebarLinkRoot
      to={to}
      isactive={
        isActive ? GLOBAL_VARIABLES.TRUE_STRING : GLOBAL_VARIABLES.FALSE_STRING
      }
      onClick={onClick}>
      {label}
    </CustomSidebarLinkRoot>
  )
}

export default CustomSidebarLink
