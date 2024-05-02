import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton'
import { SIGNUP_FORM_CONFIG } from '@features/auth/signup/SignupForm.constants'
import { Grid, Stack } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import useError from 'src/hooks/useError'
import { IError } from 'types/interfaces/Error'
import {
  useCreateUserMutation,
  useEditUserMutation,
  useGetUserByIdQuery,
} from '@redux/apis/user/usersApi'
import UploadInput from '@components/Inputs/uploadInput/UploadInput'
import useUploadFile from 'src/hooks/useUploadFile'
import { useAppDispatch } from '@redux/hooks'
import { showSuccess } from '@redux/slices/snackbarSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { PATHS } from '@config/constants/paths'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import AddUserSkeleton from './addUserSkeleton/AddUserSkeleton'

export default function AddUserForm() {
  const { userId } = useParams<string>()

  const isEditMode = Boolean(userId)
  const navigate = useNavigate()

  const { data: userData, isLoading: isLoadingUser } = useGetUserByIdQuery(
    userId as string,
    {
      skip: !isEditMode,
    },
  )
  const user = userData?.data

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const RegisterFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })

  const { getError } = useError({
    formMethods: RegisterFormMethods,
  })
  const [createUserApiAction, { isLoading: isCreating }] =
    useCreateUserMutation()

  const [updateUserApiAction, { isLoading: isUpdating }] = useEditUserMutation()

  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    formMethods: RegisterFormMethods,
    fieldName: 'profilePicture',
    initPreview: String(user?.media?.[0]?.fileName),
    index: 0,
  })

  const onSubmit = RegisterFormMethods.handleSubmit(async (values) => {
    try {
      if (isEditMode) {
        await updateUserApiAction({ id: Number(userId), user: values }).unwrap()
        dispatch(showSuccess(t('users.update_user_success')))
      } else {
        await createUserApiAction(values).unwrap()
        dispatch(showSuccess(t('users.add_user_success')))
      }
      RegisterFormMethods.reset()
      navigate(PATHS.DASHBOARD.ADMIN.USERS.ALL)
    } catch (error) {
      getError(error as IError)
    }
  })

  if (isLoadingUser) return <AddUserSkeleton />

  if (!user && !isLoadingUser && isEditMode) {
    navigate(PATHS.MAIN.ERROR.P_404, { replace: true })
    return null
  }

  return (
    <FormProvider {...RegisterFormMethods}>
      <Stack spacing={8} p={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CustomRadioButton
              config={{
                ...SIGNUP_FORM_CONFIG.userRole,
                defaultValue:
                  String(user?.role) ?? GLOBAL_VARIABLES.EMPTY_STRING,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              config={{
                ...SIGNUP_FORM_CONFIG.email,
                disabled: isEditMode,
                defaultValue: user?.email ?? GLOBAL_VARIABLES.EMPTY_STRING,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              config={{
                ...SIGNUP_FORM_CONFIG.firstName,
                defaultValue: user?.firstName ?? GLOBAL_VARIABLES.EMPTY_STRING,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              config={{
                ...SIGNUP_FORM_CONFIG.lastName,
                defaultValue: user?.lastName ?? GLOBAL_VARIABLES.EMPTY_STRING,
              }}
            />
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
          <CustomLoadingButton
            isLoading={isCreating || isUpdating}
            onClick={onSubmit}>
            {isEditMode ? t('users.update_user') : t('auth.create_account')}
          </CustomLoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  )
}
