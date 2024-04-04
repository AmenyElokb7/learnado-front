import { Typography, Button, Stack, Grid } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { SIGNUP_FORM_CONFIG } from './SignupForm.constants'
import { RegisterBody } from './SignupForm.type'
import CustomLink from '@components/customLink/CustomLink'
import { PATHS } from '@config/constants/paths'
import CustomRadioButton from '@components/customRadioButton/CustomRadioButton'
import CustomTextField from '@components/customTextField/CustomTextField'
import CustomPasswordTextField from '@components/customPasswordTextField/CustomPasswordTextField'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@redux/hooks'
import { useNavigate } from 'react-router-dom'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'
import { useSignupMutation } from '@redux/apis/auth/usersApi'

export default function SignUpForm() {
  const RegisterFormMethods = useForm<RegisterBody>({
    mode: 'onChange',
    shouldFocusError: true,
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { reset, watch } = RegisterFormMethods

  const { t } = useTranslation()

  const [registerApiAction, { isLoading }] = useSignupMutation()

  const onSubmit = RegisterFormMethods.handleSubmit(async (values) => {
    try {
      await registerApiAction(values).unwrap()
      dispatch(showSuccess(t('auth.registration_success')))
      reset()
      navigate('/login')
    } catch (error) {
      console.error(t('auth.registration_failed'), error)
      dispatch(showError('Registration failed'))
    }
  })

  const password = watch('password')
  return (
    <FormProvider {...RegisterFormMethods}>
      <Stack spacing={3} width={'100%'}>
        <Grid container width={'100%'} spacing={2}>
          <Grid item xs={12} sm={12} md={12} mt={'10px'}>
            <CustomRadioButton config={SIGNUP_FORM_CONFIG.userRole} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField config={SIGNUP_FORM_CONFIG.firstName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField config={SIGNUP_FORM_CONFIG.lastName} />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField config={SIGNUP_FORM_CONFIG.email} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomPasswordTextField config={SIGNUP_FORM_CONFIG.password} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomPasswordTextField
              config={{
                ...SIGNUP_FORM_CONFIG.confirmPassword,
                rules: {
                  validate: (value) => {
                    if (value !== password)
                      return `${t('auth.password_not_match')}`
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Stack alignItems={'center'}>
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            variant="contained"
            fullWidth
            sx={{ padding: 1.5, margin: '0px 30px' }}>
            {t('auth.create_account')}
          </Button>
        </Stack>

        <Typography variant="body2" textAlign={'center'}>
          {t('auth.already_have_account')}
          <CustomLink to={PATHS.AUTH.LOGIN} label="Login" isActive={false} />
        </Typography>
      </Stack>
    </FormProvider>
  )
}
