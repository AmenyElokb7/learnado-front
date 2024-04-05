import { Button, Stack, Grid } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

import CustomTextField from '@components/customTextField/CustomTextField'
import CustomPasswordTextField from '@components/customPasswordTextField/CustomPasswordTextField'
import { SIGNUP_FORM_CONFIG } from '../signup/SignupForm.constants'
import { LoginOptions } from './Login.type'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@redux/hooks'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '@redux/apis/auth/usersApi'
import { showError } from '@redux/slices/snackbarSlice'
import { PATHS } from '@config/constants/paths'
export default function LoginForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const LoginFormMethods = useForm<LoginOptions>({
    mode: 'onChange',
    shouldFocusError: true,
  })
  const { t } = useTranslation()
  const [login, { isLoading }] = useLoginMutation()

  const onSubmit = LoginFormMethods.handleSubmit(async (values) => {
    try {
      await login(values).unwrap()
      navigate(PATHS.ROOT)
    } catch (error: any) {
      dispatch(showError(error.data.message))
    }
  })

  return (
    <FormProvider {...LoginFormMethods}>
      <Stack spacing={3} width={'100%'}>
        <Grid container width={'100%'} spacing={2}>
          <Grid item xs={12}>
            <CustomTextField config={SIGNUP_FORM_CONFIG.email} />
          </Grid>
          <Grid item xs={12}>
            <CustomPasswordTextField config={SIGNUP_FORM_CONFIG.password} />
          </Grid>
        </Grid>
        <Stack spacing={2} mt={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={isLoading}>
            {t('auth.login')}
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  )
}
