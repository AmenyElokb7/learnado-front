import BodyCard from '@components/cards/bodyCard/BodyCard'
import UserProfile from '@features/users/userProfile/UserProfile'

function ProfilePage() {
  return (
    <BodyCard title="My profile">
      <UserProfile />
    </BodyCard>
  )
}

export default ProfilePage
