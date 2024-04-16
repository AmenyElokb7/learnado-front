import { Skeleton, Stack } from '@mui/material'

function AddUserSkeleton() {
  return (
    <Stack spacing={8}>
      <Stack direction={'row'} spacing={2}>
        <Stack spacing={1} justifyContent={'center'}>
          <Skeleton variant="rounded" width={150} height={20} />
          <Stack direction={'row'} spacing={1}>
            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="rounded" width={130} height={20} />

            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="rounded" width={130} height={20} />

            <Skeleton variant="circular" width={20} height={20} />
            <Skeleton variant="rounded" width={130} height={20} />
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={150} height={20} />
          <Skeleton variant="rounded" width={500} height={50} />
        </Stack>
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={150} height={20} />
          <Skeleton variant="rounded" width={500} height={50} />
        </Stack>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width={150} height={20} />
          <Skeleton variant="rounded" width={500} height={50} />
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="rounded" width={150} height={20} />
        <Skeleton variant="rounded" width={500} height={250} />
      </Stack>
    </Stack>
  )
}

export default AddUserSkeleton
