import BodyCard from '@components/cards/bodyCard/BodyCard'
import EditProfile from '@features/users/editProfile/EditProfile'

function AccountSettingsPage() {
  return (
    <BodyCard title="Profile Details">
      <EditProfile />
    </BodyCard>
  )
}

export default AccountSettingsPage
