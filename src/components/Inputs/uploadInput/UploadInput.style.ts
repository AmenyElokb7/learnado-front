import { BLUE } from '@config/colors/colors'
import { Stack, Typography, alpha, styled } from '@mui/material'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

export const StyledInputTypography = styled(Typography)(() => ({
  color: BLUE.main,
}))

export const StyledInputContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '200px',
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette.primary.light, 0.5),
  cursor: 'pointer',
  '&:hover': {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}))

export const StyledUploadIcon = styled(CloudUploadOutlinedIcon)(
  ({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: '30px',
  }),
)

export const StyledPreviewContainer = styled(Stack)(() => ({
  width: '100%',
  height: '100%',
  position: 'relative',
}))

export const StyledPreviewImage = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '5px',
}))
export const StyledPreviewVideo = styled('video')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '5px',
}))
export const StyledPreviewPdf = styled('object')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '5px',
}))
export const StyledDeleteIcon = styled(DeleteOutlineOutlinedIcon)(
  ({ theme }) => ({
    position: 'absolute',
    top: 5,
    right: 5,
    color: theme.palette.error.main,
    cursor: 'pointer',
    fontSize: '30px',
  }),
)
