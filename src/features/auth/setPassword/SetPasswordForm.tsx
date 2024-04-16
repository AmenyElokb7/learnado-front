import CustomPasswordTextField from '@components/Inputs/customPasswordTextField/CustomPasswordTextField'
import { PATHS } from '@config/constants/paths'
import { HttpStatusEnum } from '@config/enums/httpStatus.enum'
import { Stack, Button } from '@mui/material'
import { useSetPasswordMutation } from '@redux/apis/auth/authApi'
import { useAppDispatch } from '@redux/hooks'
import { showSuccess, showError } from '@redux/slices/snackbarSlice'
import { useForm, FormProvider } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { IError } from 'types/interfaces/Error'
import { SIGNUP_FORM_CONFIG } from '../signup/SignupForm.constants'
import { SetPasswordBody } from './SetPasswordForm.type'

function SetPasswordForm() {
  const SetPasswordFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })
  const { watch } = SetPasswordFormMethods

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const password = watch('password')

  const [setPasswordMutation] = useSetPasswordMutation()

  const onSubmit = SetPasswordFormMethods.handleSubmit(async (values) => {
    if (token) {
      try {
        await setPasswordMutation({
          token,
          data: values as SetPasswordBody,
        }).unwrap()
        navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`)
        dispatch(showSuccess(t('auth.password_set_success')))
      } catch (error) {
        if ((error as IError).status === HttpStatusEnum.BAD_REQUEST) {
          dispatch(showError(t('auth.invalid_token')))
        } else {
          dispatch(showError(t('errors.general_error')))
        }
      }
    }
  })

  return (
    <FormProvider {...SetPasswordFormMethods}>
      <Stack spacing={3} width={'100%'} mt={2}>
        <CustomPasswordTextField
          config={{ ...SIGNUP_FORM_CONFIG.password, defaultValue: password }}
        />
        <CustomPasswordTextField
          config={{
            ...SIGNUP_FORM_CONFIG.confirmPassword,
            rules: {
              validate: (value) => {
                if (value !== password) return `${t('auth.password_not_match')}`
              },
            },
          }}
        />
        <Button onClick={onSubmit} variant="outlined">
          {t('auth.set_password')}
        </Button>
      </Stack>
    </FormProvider>
  )
}

export default SetPasswordForm
