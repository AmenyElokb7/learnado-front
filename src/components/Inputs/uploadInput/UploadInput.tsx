import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Stack, Tooltip } from '@mui/material'
import {
  StyledDeleteIcon,
  StyledInputContainer,
  StyledInputTypography,
  StyledPreviewContainer,
  StyledPreviewImage,
  StyledPreviewPdf,
  StyledPreviewVideo,
  StyledUploadIcon,
} from './UploadInput.style'
import { UploadInputProps } from './UploadInput.type'

function UploadInput({
  preview,
  multiple,
  label,
  file,
  isEditMode,
  onChange,
  onDelete,
}: UploadInputProps) {
  const { t } = useTranslation()
  const ref = useRef<HTMLInputElement>(null)

  const handleOnContainerClick = () => {
    ref.current?.click()
  }

  const FilePreview = (file: File) => {
    const fileURL = isEditMode ? file.name : URL.createObjectURL(file)

    if (file.type.startsWith('image/')) {
      return <StyledPreviewImage src={preview ?? fileURL} alt="File preview" />
    } else if (file.type.startsWith('video/')) {
      return (
        <StyledPreviewVideo controls>
          <source src={fileURL} type={file.type} />
        </StyledPreviewVideo>
      )
    } else if (file.type === 'application/pdf') {
      return (
        <StyledPreviewPdf data={fileURL}>
          <embed src={fileURL} type="application/pdf" />
        </StyledPreviewPdf>
      )
    }
  }

  return (
    <>
      <Stack direction={'column'} spacing={1} width={'100%'}>
        {label && (
          <StyledInputTypography variant="h6">{label}</StyledInputTypography>
        )}

        <StyledInputContainer onClick={handleOnContainerClick}>
          {preview ? (
            <StyledPreviewContainer>
              {file && FilePreview(file) ? (
                FilePreview(file)
              ) : (
                <StyledPreviewImage src={preview} />
              )}
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
