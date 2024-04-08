import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import CustomRadioButton from '@components/customRadioButton/CustomRadioButton'
import { SIGNUP_FORM_CONFIG } from '@features/auth/signup/SignupForm.constants'
import { Grid, Stack } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useError from 'src/hooks/useError'
import { IError } from 'types/interfaces/Error'
import { useCreateUserMutation } from '@redux/apis/user/usersApi'
import UploadInput from '@components/Inputs/uploadInput/UploadInput'
import useUploadFile from 'src/hooks/useUploadFile'
import { useAppDispatch } from '@redux/hooks'
import { showSuccess } from '@redux/slices/snackbarSlice'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@config/constants/paths'

export default function AddUserForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { t } = useTranslation()
  const RegisterFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })

  const { getError } = useError({
    formMethods: RegisterFormMethods,
  })
  const [createUserApiAction, { isLoading }] = useCreateUserMutation()

  const onSubmit = RegisterFormMethods.handleSubmit(async (values) => {
    try {
      await createUserApiAction(values).unwrap()
      RegisterFormMethods.reset()
      dispatch(showSuccess(t('user.add_user_success')))
      navigate(PATHS.DASHBOARD.ADMIN.USERS.ALL)
    } catch (error) {
      getError(error as IError)
    }
  })

  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    formMethods: RegisterFormMethods,
    fieldName: 'profilePicture',
    initPreview: null,
  })

  return (
    <FormProvider {...RegisterFormMethods}>
      <Stack spacing={8} p={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CustomRadioButton config={SIGNUP_FORM_CONFIG.userRole} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField config={SIGNUP_FORM_CONFIG.email} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField config={SIGNUP_FORM_CONFIG.firstName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField config={SIGNUP_FORM_CONFIG.lastName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <UploadInput
                onChange={handleOnChange}
                onDelete={handleResetPreview}
                preview={preview}
              />
            </Stack>
          </Grid>
        </Grid>
        <Stack alignItems={'center'}>
          <CustomLoadingButton isLoading={isLoading} onClick={onSubmit}>
            {t('auth.create_account')}
          </CustomLoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  )
}
