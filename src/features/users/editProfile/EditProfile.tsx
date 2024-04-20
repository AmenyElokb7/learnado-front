import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import FallbackLoader from '@components/fallback/FallbackLoader'
import { BLUE } from '@config/colors/colors'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { Divider, Grid, Stack, Typography } from '@mui/material'
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from '@redux/apis/user/usersApi'
import { useTranslation } from 'react-i18next'
import { SIGNUP_FORM_CONFIG } from '@features/auth/signup/SignupForm.constants'
import { FormProvider, useForm } from 'react-hook-form'
import UploadInput from '@components/Inputs/uploadInput/UploadInput'
import useUploadFile from 'src/hooks/useUploadFile'
import { useAppDispatch } from '@redux/hooks'
import { showSuccess } from '@redux/slices/snackbarSlice'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@config/constants/paths'
import { IError } from 'types/interfaces/Error'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import { useRef } from 'react'
import { User } from 'types/models/User'
import CustomPasswordTextField from '@components/Inputs/customPasswordTextField/CustomPasswordTextField'
import useError from 'src/hooks/useError'
import Error from '@components/error/Error'

function EditProfile() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const UserFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })
  const { data, isLoading, isError } = useGetUserProfileQuery()

  const initialDataRef = useRef(data?.data)

  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    formMethods: UserFormMethods,
    fieldName: 'profilePicture',
    initPreview: String(data?.data?.media?.[0]?.fileName),
    index: 0,
  })

  const { getError } = useError({
    formMethods: UserFormMethods,
  })

  const [updateProfileApiAction, { isLoading: isUpdating }] =
    useUpdateProfileMutation()

  const onSubmit = UserFormMethods.handleSubmit(async (values) => {
    const modifiedValues: Partial<User> = {
      firstName: values.firstName,
      lastName: values.lastName,
    }
    if (values.password) {
      modifiedValues.password = values.password
      modifiedValues.passwordConfirmation = values.passwordConfirmation
    }

    Object.keys(modifiedValues).forEach((key) => {
      const currentKey = key as keyof User
      if (
        initialDataRef.current &&
        values[currentKey] === initialDataRef.current[currentKey]
      ) {
        modifiedValues[currentKey] = values[currentKey]
      }
    })

    try {
      await updateProfileApiAction(modifiedValues).unwrap()
      dispatch(showSuccess(t('users.profile_updated_successfully')))
      navigate(PATHS.DASHBOARD.PROFILE.ROOT)
    } catch (error) {
      getError(error as IError)
    }
  })

  if (isError) return <Error />

  if (isLoading) return <FallbackLoader />

  return (
    <>
      <Stack mb={2} spacing={2}>
        <Typography variant={'h3'} fontWeight={'medium'} color={BLUE.main}>
          {t('users.personal_information')}
        </Typography>
        <Typography variant={'body2'}>
          {t('users.personal_information_description')}
        </Typography>
        <Divider />
      </Stack>
      <FormProvider {...UserFormMethods}>
        <Grid container p={2} gap={4}>
          <Grid item xs={12} display={'flex'} gap={2}>
            <Grid item xs={12} sm={6}>
              <Stack mb={2}>
                <CustomTextField
                  config={{
                    ...SIGNUP_FORM_CONFIG.firstName,
                    defaultValue:
                      data?.data?.firstName || GLOBAL_VARIABLES.EMPTY_STRING,
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack mb={2}>
                <CustomTextField
                  config={{
                    ...SIGNUP_FORM_CONFIG.lastName,
                    defaultValue:
                      data?.data?.lastName || GLOBAL_VARIABLES.EMPTY_STRING,
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} display={'flex'} gap={2}>
            <Grid item xs={12} sm={6}>
              <Stack mb={2}>
                <CustomTextField
                  config={{
                    ...SIGNUP_FORM_CONFIG.email,
                    defaultValue:
                      data?.data?.email || GLOBAL_VARIABLES.EMPTY_STRING,
                    disabled: true,
                  }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Typography variant={'h3'} fontWeight={'medium'} color={BLUE.main}>
          {t('users.update_profile_picture')}
        </Typography>
        <Stack width={'400px'}>
          <UploadInput
            onChange={handleOnChange}
            onDelete={handleResetPreview}
            preview={preview}
          />
        </Stack>
        <Divider />
        <Typography variant={'h3'} fontWeight={'medium'} color={BLUE.main}>
          {t('users.update_password')}
        </Typography>
        <Stack spacing={2}>
          <CustomPasswordTextField
            config={{
              ...SIGNUP_FORM_CONFIG.password,
              rules: {
                required: false,
              },
            }}
          />
          <CustomPasswordTextField
            config={{
              ...SIGNUP_FORM_CONFIG.passwordConfirmation,
            }}
          />
        </Stack>
        <Divider />
        <CustomLoadingButton isLoading={isUpdating} onClick={onSubmit}>
          {t('users.update_profile')}
        </CustomLoadingButton>
      </FormProvider>
    </>
  )
}

export default EditProfile
