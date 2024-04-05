import { Button, Stack, Grid, Box, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import CustomPasswordTextField from '@components/Inputs/customPasswordTextField/CustomPasswordTextField'
import { SIGNUP_FORM_CONFIG } from '../signup/SignupForm.constants'
import { LoginOptions } from './Login.type'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@redux/hooks'
import { useNavigate } from 'react-router-dom'
import { showError } from '@redux/slices/snackbarSlice'
import { PATHS } from '@config/constants/paths'
import CustomLink from '@components/customLink/CustomLink'
import { useLoginMutation } from '@redux/apis/auth/authApi'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
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
        <CustomLoadingButton isLoading={isLoading} onClick={onSubmit}>
          {t('auth.login')}
        </CustomLoadingButton>
      </Stack>
      <Box textAlign="center" marginTop={2}>
        <Typography variant="body2">
          {t('auth.dont_have_account')}
          <CustomLink
            to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SIGNUP}`}
            label={t('auth.signup')}
            isActive={false}
          />
        </Typography>
      </Box>
    </FormProvider>
  )
}
