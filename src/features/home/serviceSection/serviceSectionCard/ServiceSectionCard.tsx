import { Stack } from '@mui/material'
import { ServiceSectionCardProps } from './serviceSectionCard.type'
import { DescriptionStyled } from '@components/typographies/description/description.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function ServiceSectionCard({ icon, description }: ServiceSectionCardProps) {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <img
        src={icon}
        alt={GLOBAL_VARIABLES.APP_NAME}
        width="60px"
        height="60px"
      />
      <DescriptionStyled>{description}</DescriptionStyled>
    </Stack>
  )
}

export default ServiceSectionCard
