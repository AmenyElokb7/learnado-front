import { Grid, Stack } from '@mui/material'
import { CourseFormProps } from './CourseForm.type'
import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import UploadInput from '@components/Inputs/uploadInput/UploadInput'
import CourseMapCard from '@components/courseMapCard/CourseMapCard'
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton'
import CustomSelectField from '@components/Inputs/customSelectField/CustomSelectField'
import { ConfigEnv } from '@config/configEnv'
import { TeachingTypeFilterEnum } from '@config/enums/teachingType.enum'
import { CREATE_COURSE_FORM_CONFIG } from './CourseForm.constants'
import useCourseForm from './useCourseForm'
import useUploadFile from 'src/hooks/useUploadFile'
import { FormProvider } from 'react-hook-form'
import FallbackLoader from '@components/fallback/FallbackLoader'
import { useTranslation } from 'react-i18next'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function CourseForm({
  formMethods,
  isEditMode,
  defaultValues,
}: CourseFormProps) {
  const {
    isLoadingAdditinalData,
    isPaid,
    isPublic,
    teachingType,
    categoryOptions,
    activeUsersOptions,
    facilitatorOptions,
    languageOptions,
    handleLatitudeChange,
    handleLongitudeChange,
  } = useCourseForm({ formMethods })

  const { t } = useTranslation()

  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    formMethods,
    fieldName: 'courseMedia',
    initPreview: null,
    index: 0,
  })

  if (isLoadingAdditinalData) return <FallbackLoader />

  return (
    <FormProvider {...formMethods}>
      <Stack spacing={8} p={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack mb={2}>
              <CustomTextField
                config={{
                  ...CREATE_COURSE_FORM_CONFIG.title,
                  defaultValue: isEditMode
                    ? defaultValues?.title
                    : GLOBAL_VARIABLES.EMPTY_STRING,
                }}
              />
            </Stack>
            <Stack mb={2}>
              <CustomSelectField
                config={{
                  ...CREATE_COURSE_FORM_CONFIG.category,
                  options: categoryOptions,
                  defaultValue: isEditMode
                    ? defaultValues?.categoryId
                    : GLOBAL_VARIABLES.EMPTY_STRING,
                }}
              />
            </Stack>
            <CustomSelectField
              config={{
                ...CREATE_COURSE_FORM_CONFIG.language,
                options: languageOptions,
                defaultValue: isEditMode
                  ? defaultValues?.languageId
                  : GLOBAL_VARIABLES.EMPTY_STRING,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              config={{
                ...CREATE_COURSE_FORM_CONFIG.description,
                defaultValue: isEditMode
                  ? defaultValues?.description
                  : GLOBAL_VARIABLES.EMPTY_STRING,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomRadioButton
              config={{
                ...CREATE_COURSE_FORM_CONFIG.isPaid,
                defaultValue: isEditMode ? (defaultValues?.isPaid ? 1 : 0) : 0,
              }}
            />
          </Grid>
          {Number(isPaid) === 1 && (
            <>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  config={{
                    ...CREATE_COURSE_FORM_CONFIG.price,
                    rules: { required: 'course.price_required' },
                    defaultValue: isEditMode
                      ? defaultValues?.price
                      : GLOBAL_VARIABLES.EMPTY_STRING,
                    ommitedFromSubmissionData: Number(isPaid) === 0,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  config={{
                    ...CREATE_COURSE_FORM_CONFIG.discount,
                    rules: { required: 'course.discount_required' },
                    defaultValue: isEditMode
                      ? defaultValues?.discount
                      : GLOBAL_VARIABLES.EMPTY_STRING,
                    ommitedFromSubmissionData: Number(isPaid) === 0,
                  }}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={6}>
            <CustomRadioButton
              config={{
                ...CREATE_COURSE_FORM_CONFIG.isPublic,
                defaultValue: isEditMode
                  ? defaultValues?.isPublic
                    ? 1
                    : 0
                  : 0,
              }}
            />
          </Grid>
          {isPublic == 0 && (
            <Grid item xs={12} sm={6}>
              <CustomSelectField
                config={{
                  ...CREATE_COURSE_FORM_CONFIG.selectedUserIds,
                  rules: { required: 'course.select_user_required' },
                  options: activeUsersOptions,
                  defaultValue: isEditMode ? defaultValues?.subscribers : [],
                }}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <CustomSelectField
              config={{
                ...CREATE_COURSE_FORM_CONFIG.facilitator,
                options: facilitatorOptions,
                defaultValue: isEditMode
                  ? defaultValues?.facilitatorId
                  : GLOBAL_VARIABLES.EMPTY_STRING,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomSelectField
              config={{
                ...CREATE_COURSE_FORM_CONFIG.teachingType,
                defaultValue: isEditMode
                  ? defaultValues?.teachingType
                  : TeachingTypeFilterEnum.NO_TYPE,
              }}
            />
          </Grid>
          {/* TODO: track the place when changing the state and get the default value if isEditMode */}
          {teachingType === TeachingTypeFilterEnum.ON_A_PLACE && (
            <Grid item xs={12}>
              <CourseMapCard
                setLatitude={handleLatitudeChange}
                setLongitude={handleLongitudeChange}
                mapboxAccessToken={ConfigEnv.MAPBOX_ACCESS_TOKEN}
              />
            </Grid>
          )}

          {teachingType === TeachingTypeFilterEnum.ONLINE && (
            <Grid item xs={12} sm={6}>
              <CustomTextField
                config={{
                  ...CREATE_COURSE_FORM_CONFIG.link,
                  rules: { required: 'course.link_required' },
                  defaultValue: isEditMode
                    ? defaultValues?.link
                    : GLOBAL_VARIABLES.EMPTY_STRING,
                }}
              />
            </Grid>
          )}
  
          {(teachingType === TeachingTypeFilterEnum.ONLINE ||
            teachingType === TeachingTypeFilterEnum.ON_A_PLACE) && (
            <>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  config={{
                    ...CREATE_COURSE_FORM_CONFIG.startTime,
                    rules: { required: 'course.start_time_required' },
                    defaultValue: isEditMode
                      ? defaultValues?.startTime
                      : GLOBAL_VARIABLES.EMPTY_STRING,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  config={{
                    ...CREATE_COURSE_FORM_CONFIG.endTime,
                    rules: {
                      required: 'course.end_time_required',
                    },
                    defaultValue: isEditMode
                      ? defaultValues?.endTime
                      : GLOBAL_VARIABLES.EMPTY_STRING,
                  }}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={6}>
            <CustomRadioButton
              config={{
                ...CREATE_COURSE_FORM_CONFIG.isSequential,
                defaultValue: isEditMode
                  ? defaultValues?.sequential
                    ? 1
                    : 0
                  : 0,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <UploadInput
                onChange={handleOnChange}
                onDelete={handleResetPreview}
                preview={preview}
                label={t('course.upload_media')}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  )
}

export default CourseForm
