import BodyCard from '@components/cards/bodyCard/BodyCard'
import AddUserForm from '@features/users/addUser/AddUserForm'
import { useTranslation } from 'react-i18next'

function AddUserPages() {
  const { t } = useTranslation()
  return (
    <BodyCard title={t('user.add_user')}>
      <AddUserForm />
    </BodyCard>
  )
}

export default AddUserPages
