import AuthHeader from '@components/header/authHeader/AuthHeader'
import LoginForm from '@features/auth/login/LoginForm'

function LoginPage() {
  return (
    <>
      <AuthHeader title="auth.login" />
      <LoginForm />
    </>
  )
}

export default LoginPage
