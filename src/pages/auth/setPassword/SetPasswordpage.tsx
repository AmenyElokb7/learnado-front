import AuthHeader from '@components/header/authHeader/AuthHeader'
import SetPasswordForm from '@features/auth/setPassword/SetPasswordForm'

const SetPasswordPage = () => {
  return (
    <>
      <AuthHeader title="auth.set_password" />
      <SetPasswordForm />
    </>
  )
}

export default SetPasswordPage
