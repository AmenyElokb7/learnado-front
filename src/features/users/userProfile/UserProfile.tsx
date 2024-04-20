import Error from '@components/error/Error'
import FallbackLoader from '@components/fallback/FallbackLoader'
import { BLUE } from '@config/colors/colors'
import { Grid, Stack, Typography } from '@mui/material'
import { useGetUserProfileQuery } from '@redux/apis/user/usersApi'
import { useTranslation } from 'react-i18next'

function UserProfile() {
  const { t } = useTranslation()

  const { data, isLoading, isError } = useGetUserProfileQuery()

  if (isError) return <Error />

  if (isLoading) return <FallbackLoader />

  return (
    <Grid container p={2} gap={4}>
      <Grid item xs={12} display={'flex'}>
        <Grid item xs={12} sm={6}>
          <Stack mb={2}>
            <Typography variant={'h3'} fontWeight={'medium'} color={BLUE.main}>
              {t('auth.first_name')}
            </Typography>
            <Typography variant={'body1'}>{data?.data.firstName}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack mb={2}>
            <Typography variant={'h3'} fontWeight={'medium'} color={BLUE.main}>
              {t('auth.last_name')}
            </Typography>
            <Typography variant={'body1'}>{data?.data.lastName}</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12} display={'flex'}>
        <Grid item xs={12} sm={6}>
          <Stack mb={2}>
            <Typography variant={'h3'} fontWeight={'medium'} color={BLUE.main}>
              {t('auth.email')}
            </Typography>
            <Typography variant={'body1'}>{data?.data.email}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack mb={2}>
            <Typography variant={'h3'} fontWeight={'medium'} color={BLUE.main}>
              {t('auth.registration_date')}
            </Typography>
            <Typography variant={'body1'}>{data?.data?.createdAt}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserProfile
