import { Stack, Grid, Box, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import CustomPasswordTextField from '@components/Inputs/customPasswordTextField/CustomPasswordTextField'
import { SIGNUP_FORM_CONFIG } from '../signup/SignupForm.constants'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@redux/hooks'
import { showError } from '@redux/slices/snackbarSlice'
import { PATHS } from '@config/constants/paths'
import CustomLink from '@components/customLink/CustomLink'
import { useLoginMutation } from '@redux/apis/auth/authApi'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import useError from 'src/hooks/useError'
import { LoginRequest } from '@redux/apis/auth/authApi.type'
import { IError } from 'types/interfaces/Error'
import { HttpStatusEnum } from '@config/enums/httpStatus.enum'
import { useState } from 'react'
import CustomErrorDialog from '@components/dialogs/customErrorDialog/CustomErrorDialog'
export default function LoginForm() {
  const dispatch = useAppDispatch()

  const [openModal, setOpenModal] = useState(false)

  const LoginFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })
  const { t } = useTranslation()
  const [login, { isLoading }] = useLoginMutation()
  const { getError } = useError({ formMethods: LoginFormMethods })
  const onSubmit = LoginFormMethods.handleSubmit(async (values) => {
    try {
      await login(values as LoginRequest).unwrap()
    } catch (error) {
      if ((error as IError).status === HttpStatusEnum.UNAUTHORIZED) {
        getError(error as IError)
      } else if ((error as IError).status === HttpStatusEnum.FORBIDDEN) {
        setOpenModal(true)
      } else {
        dispatch(showError(t('errors.general_error')))
      }
    }
  })

  return (
    <>
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
        <Box textAlign="center" marginTop={2}>
          <CustomLink
            to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.FORGET_PASSWORD}`}
            label={t('auth.forget_password')}
            isActive={false}
          />
        </Box>
      </FormProvider>
      <CustomErrorDialog
        content={t('errors.account_not_verified')}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}
