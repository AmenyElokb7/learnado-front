import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Typography, Stack, Grid, Box } from '@mui/material'
import { RegisterBody } from './SignupForm.type'
import CustomLink from '@components/customLink/CustomLink'
import { PATHS } from '@config/constants/paths'
import CustomRadioButton from '@components/customRadioButton/CustomRadioButton'
import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import CustomPasswordTextField from '@components/Inputs/customPasswordTextField/CustomPasswordTextField'
import { useTranslation } from 'react-i18next'
import { SIGNUP_FORM_CONFIG } from './SignupForm.constants'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import { useSignupMutation } from '@redux/apis/auth/authApi'
import { IError } from 'types/interfaces/Error'
import useError from 'src/hooks/useError'
import CustomDialog from '@components/dialogs/CustomDialog'
import successImage from '@assets/logo/success.gif'

export default function SignUpForm() {
  const [openModal, setOpenModal] = useState(false)

  const RegisterFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })
  const { watch } = RegisterFormMethods

  const { getError } = useError({
    formMethods: RegisterFormMethods,
  })
  const { t } = useTranslation()
  const [registerApiAction, { isLoading }] = useSignupMutation()

  const onSubmit = RegisterFormMethods.handleSubmit(async (values) => {
    try {
      await registerApiAction(values as RegisterBody).unwrap()
      setOpenModal(true)
      RegisterFormMethods.reset()
    } catch (error) {
      getError(error as IError)
    }
  })

  const password = watch('password')
  return (
    <>
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
            <CustomLoadingButton isLoading={isLoading} onClick={onSubmit}>
              {t('auth.create_account')}
            </CustomLoadingButton>
          </Stack>

          <Typography variant="body2" textAlign={'center'}>
            {t('auth.already_have_account')}
            <CustomLink
              to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`}
              label="Login"
              isActive={false}
            />
          </Typography>
        </Stack>
        <Box textAlign="center" marginTop={2}>
          <CustomLink
            to={`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.FORGET_PASSWORD}`}
            label={t('auth.forget_password')}
            isActive={false}
          />
        </Box>
      </FormProvider>
      <CustomDialog
        children={successImage}
        title={t('auth.success_signup')}
        open={openModal}
        onClose={() => setOpenModal(false)}
        onButtonClick={() => setOpenModal(false)}
      />
    </>
  )
}
