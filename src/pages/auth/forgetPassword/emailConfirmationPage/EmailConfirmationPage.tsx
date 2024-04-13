import AuthHeader from '@components/header/authHeader/AuthHeader'
import EmailConfirmationForm from '@features/auth/resetPassword/emailConfirmation/EmailConfirmationForm'

function EmailConfirmationPage() {
  return (
    <>
      <AuthHeader title="auth.confirm_email" />
      <EmailConfirmationForm />
    </>
  )
}

export default EmailConfirmationPage
