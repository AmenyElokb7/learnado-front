import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@redux/hooks'
import { useNavigate } from 'react-router-dom'

import { Stack } from '@mui/material'

import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import { SIGNUP_FORM_CONFIG } from '@features/auth/signup/SignupForm.constants'
import { useSendResetPasswordEmailMutation } from '@redux/apis/auth/authApi'
import useError from 'src/hooks/useError'
import { IError } from 'types/interfaces/Error'
import { HttpStatusEnum } from '@config/enums/httpStatus.enum'
import { showError } from '@redux/slices/snackbarSlice'
import { PATHS } from '@config/constants/paths'

function EmailConfirmationForm() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const ResetPasswordFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })

  const [sendEmail, { isLoading }] = useSendResetPasswordEmailMutation()
  const { getError } = useError({ formMethods: ResetPasswordFormMethods })

  const onSubmit = ResetPasswordFormMethods.handleSubmit(async (data) => {
    const { email } = data
    try {
      await sendEmail({ email }).unwrap()
      navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.SET_PASSWORD}`)
    } catch (error) {
      if ((error as IError).status === HttpStatusEnum.UNAUTHORIZED) {
        getError(error as IError)
      } else if ((error as IError).status === HttpStatusEnum.NOT_FOUND) {
        getError(error as IError)
      } else {
        dispatch(showError(t('errors.general_error')))
      }
    }
  })

  return (
    <Stack spacing={4} m={2}>
      <FormProvider {...ResetPasswordFormMethods}>
        <CustomTextField config={SIGNUP_FORM_CONFIG.email} />
        <CustomLoadingButton isLoading={isLoading} onClick={onSubmit}>
          {t('auth.send_email')}
        </CustomLoadingButton>
      </FormProvider>
    </Stack>
  )
}

export default EmailConfirmationForm
