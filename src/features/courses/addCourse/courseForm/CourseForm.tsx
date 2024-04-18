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

function CourseForm({ formMethods }: CourseFormProps) {
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
            <CustomTextField config={CREATE_COURSE_FORM_CONFIG.title} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField config={CREATE_COURSE_FORM_CONFIG.description} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSelectField
              config={{
                ...CREATE_COURSE_FORM_CONFIG.category,
                options: categoryOptions,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomSelectField
              config={{
                ...CREATE_COURSE_FORM_CONFIG.language,
                options: languageOptions,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomRadioButton config={CREATE_COURSE_FORM_CONFIG.isPaid} />
          </Grid>
          {isPaid == 1 && (
            <>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  config={{
                    ...CREATE_COURSE_FORM_CONFIG.price,
                    rules: { required: 'course.price_required' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  config={{
                    ...CREATE_COURSE_FORM_CONFIG.discount,
                    rules: { required: 'course.discount_required' },
                  }}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} sm={6}>
            <CustomRadioButton config={CREATE_COURSE_FORM_CONFIG.isPublic} />
          </Grid>
          {isPublic == 0 && (
            <Grid item xs={12} sm={6}>
              <CustomSelectField
                config={{
                  ...CREATE_COURSE_FORM_CONFIG.selectedUserIds,
                  rules: { required: 'course.select_user_required' },
                  options: activeUsersOptions,
                }}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <CustomSelectField
              config={{
                ...CREATE_COURSE_FORM_CONFIG.facilitator,
                options: facilitatorOptions,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomSelectField
              config={CREATE_COURSE_FORM_CONFIG.teachingType}
            />
          </Grid>

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
                  }}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={6}>
            <CustomRadioButton
              config={CREATE_COURSE_FORM_CONFIG.isSequential}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <UploadInput
                onChange={handleOnChange}
                onDelete={handleResetPreview}
                preview={preview}
                multiple={true}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </FormProvider>
  )
}

export default CourseForm
