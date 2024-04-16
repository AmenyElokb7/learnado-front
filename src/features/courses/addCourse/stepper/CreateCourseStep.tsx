import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import UploadInput from '@components/Inputs/uploadInput/UploadInput'
import { Grid, Stack } from '@mui/material'
import useUploadFile from 'src/hooks/useUploadFile'
import { CREATE_COURSE_FORM_CONFIG } from './CreateCourseStep.constants'
import { useGetCategoriesQuery } from '@redux/apis/categories/categoriesApi'
import {
  useGetActiveUsersQuery,
  useGetFacilitatorsQuery,
} from '@redux/apis/user/usersApi'
import usePagination from 'src/hooks/usePagination'
import CustomSelectField from '@components/customSelectField/CustomSelectField'
import { useGetLanguagesQuery } from '@redux/apis/languages/languagesApi'
import CustomRadioButton from '@components/customRadioButton/CustomRadioButton'
import { TeachingTypeFilterEnum } from '@config/enums/teachingType.enum'
import { useCallback, useEffect } from 'react'
import CourseMapCard from '@components/courseMapCard/CourseMapCard'
import { ConfigEnv } from '@config/configEnv'
import { CreateCourseStepProps } from './CreateCourseStep.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

function CreateCourseStep({ formMethods }: CreateCourseStepProps) {
  const { watch, setValue } = formMethods

  const isPaid = watch('isPaid')
  const isPublic = watch('isPublic')
  const teachingType = watch('teachingType')

  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    formMethods,
    fieldName: 'courseMedia[]',
    initPreview: null,
  })

  const { queryParams } = usePagination()
  const { data: categoriesData } = useGetCategoriesQuery({
    ...queryParams,
    pagination: false,
  })
  const { data: facilitatorsData } = useGetFacilitatorsQuery({
    ...queryParams,
    pagination: false,
  })
  const { data: languagesData } = useGetLanguagesQuery({
    ...queryParams,
    pagination: false,
  })
  const { data: activeUsersData } = useGetActiveUsersQuery({
    ...queryParams,
    pagination: false,
  })

  const categoryOptions = categoriesData?.data.map((cat) => ({
    label: cat.title,
    value: cat.id,
  }))
  const facilitatorOptions = facilitatorsData?.data.map((fac) => ({
    label: fac.firstName + ' ' + fac.lastName,
    value: fac.id,
  }))
  const languageOptions = languagesData?.data.map((lang) => ({
    label: lang.language,
    value: lang.id,
  }))
  const activeUsersOptions = activeUsersData?.data.map((user) => ({
    label: user.firstName + ' ' + user.lastName,
    value: user.id,
  }))

  useEffect(() => {
    setValue('latitude', GLOBAL_VARIABLES.DEFAULT_LOCALIZATION.LAT)
    setValue('longitude', GLOBAL_VARIABLES.DEFAULT_LOCALIZATION.LNG)
  }, [setValue])

  const setLatitude = useCallback(
    (lat: number) => {
      setValue('latitude', lat)
    },

    [setValue],
  )

  const setLongitude = useCallback(
    (lng: number) => {
      setValue('longitude', lng)
    },
    [setValue],
  )
  //TODO: handle date time picker for start and end time
  // TODO: multiple file upload

  return (
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
          <CustomSelectField config={CREATE_COURSE_FORM_CONFIG.teachingType} />
        </Grid>

        {teachingType === TeachingTypeFilterEnum.ON_A_PLACE && (
          <Grid item xs={12}>
            <CourseMapCard
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              mapboxAccessToken={ConfigEnv.MAPBOX_ACCESS_TOKEN}
            />
          </Grid>
        )}

        {teachingType === TeachingTypeFilterEnum.ONLINE && (
          <Grid item xs={12} sm={6}>
            <CustomTextField
              config={{
                ...CREATE_COURSE_FORM_CONFIG.link,
                rules: { required: 'Link is required' },
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
                  rules: { required: 'Start time is required' },
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
          <CustomRadioButton config={CREATE_COURSE_FORM_CONFIG.isSequential} />
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
  )
}

export default CreateCourseStep
