import { getUserFromLocalStorage } from '@utils/localStorage/storage'
import {
  ProfileGroup,
  ProfileName,
  ProfileRole,
  StyledAvatar,
  StyledCard,
  StyledContentCard,
} from './ProfileCard.style'
import { getUserRole } from '@utils/helpers/userRole.helpers'
import { useTranslation } from 'react-i18next'

const ProfileCard = () => {
  const user = getUserFromLocalStorage()
  const { t } = useTranslation()

  return (
    <StyledCard>
      {user && (
        <>
          <StyledContentCard>
            <StyledAvatar src={user?.media?.[0].fileName} alt="avatar" />
          </StyledContentCard>
          <ProfileGroup>
            <ProfileName variant="h6">
              {user?.firstName} {user?.lastName}
            </ProfileName>
            <ProfileRole>{t(getUserRole(user?.role))}</ProfileRole>
          </ProfileGroup>
        </>
      )}
    </StyledCard>
  )
}

export default ProfileCard
