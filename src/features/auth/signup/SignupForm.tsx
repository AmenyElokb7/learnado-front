import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Typography, Stack, Grid } from '@mui/material'
import { RegisterBody } from './SignupForm.type'
import CustomLink from '@components/customLink/CustomLink'
import { PATHS } from '@config/constants/paths'
import CustomRadioButton from '@components/customRadioButton/CustomRadioButton'
import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import CustomPasswordTextField from '@components/Inputs/customPasswordTextField/CustomPasswordTextField'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@redux/hooks'
import { showError } from '@redux/slices/snackbarSlice'
import { SIGNUP_FORM_CONFIG } from './SignupForm.constants'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import CustomSuccessDialog from '@components/dialogs/customSuccessDialog/CustomSuccessDialog'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useSignupMutation } from '@redux/apis/auth/authApi'

export default function SignUpForm() {
  const [openModal, setOpenModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState(
    GLOBAL_VARIABLES.EMPTY_STRING,
  )

  const RegisterFormMethods = useForm<RegisterBody>({
    mode: 'onChange',
    shouldFocusError: true,
  })
  const dispatch = useAppDispatch()
  const { watch } = RegisterFormMethods

  const { t } = useTranslation()
  const [registerApiAction, { isLoading }] = useSignupMutation()

  const onSubmit = RegisterFormMethods.handleSubmit(async (values) => {
    try {
      const res = await registerApiAction(values).unwrap()
      setSuccessMessage(res?.message)
      setOpenModal(true)
    } catch (error: any) {
      dispatch(showError(error.data.message as string))
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
      </FormProvider>
      <CustomSuccessDialog
        content={successMessage}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}
