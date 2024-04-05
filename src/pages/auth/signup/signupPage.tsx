import SignUpForm from '@features/auth/signup/SignupForm'
import AuthHeader from '@components/header/authHeader/AuthHeader'
export const signupPage = () => {
  return (
    <>
      <AuthHeader title="auth.signup" />
      <SignUpForm />
    </>
  )
}

export default signupPage
