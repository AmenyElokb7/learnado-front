import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Stack, Tooltip } from '@mui/material'
import {
  StyledDeleteIcon,
  StyledInputContainer,
  StyledInputTypography,
  StyledPreviewContainer,
  StyledPreviewImage,
  StyledUploadIcon,
} from './UploadInput.style'
import { UploadInputProps } from './UploadInput.type'

function UploadInput({
  preview,
  onChange,
  onDelete,
  multiple,
}: UploadInputProps) {
  const { t } = useTranslation()
  const ref = useRef<HTMLInputElement>(null)

  const handleOnContainerClick = () => {
    ref.current?.click()
  }

  return (
    <>
      <Stack direction={'column'} spacing={1}>
        <StyledInputTypography variant="h6">
          {t('alt.upload_image')}
        </StyledInputTypography>
        <StyledInputContainer onClick={handleOnContainerClick}>
          {preview ? (
            <StyledPreviewContainer>
              <StyledPreviewImage src={preview} alt="preview" />
              <Tooltip title={t('common.delete')} arrow>
                <StyledDeleteIcon onClick={onDelete} />
              </Tooltip>
            </StyledPreviewContainer>
          ) : (
            <StyledUploadIcon />
          )}
        </StyledInputContainer>
      </Stack>
      <input
        type="file"
        ref={ref}
        onChange={onChange}
        style={{ display: 'none' }}
        multiple={multiple}
      />
    </>
  )
}

export default UploadInput
