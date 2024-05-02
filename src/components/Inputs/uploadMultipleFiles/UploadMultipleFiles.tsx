import { Grid } from '@mui/material'
import { UploadMultipleFilesProps } from './UplaodMultipleFiles.type'
import UploadInput from '../uploadInput/UploadInput'
import { ChangeEvent, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'

function UploadMultipleFiles({
  files,
  index,
  isEditMode,
  setFiles,
}: UploadMultipleFilesProps) {
  const { t } = useTranslation()
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length) {
      setFiles(prev => ({
        ...prev,
        [index]: [...(prev[index] || []), ...newFiles],
      }));
    }
  };

  const handleDeletePreview = (
    event: MouseEvent<SVGSVGElement>,
    fileIndex: number,
  ) => {
    event.stopPropagation()
    setFiles((prev) => {
      const files = prev[index] || []
      return {
        ...prev,
        [index]: files.filter((f) => f !== file),
      }
    })

    const file = files[fileIndex]
    if (file) {
      URL.revokeObjectURL(URL.createObjectURL(file))
    }
  }

  return (
    <>
      <Grid item xs={12} sm={6}>
        <UploadInput
          label={t('common.upload')}
          onChange={handleChange}
          onDelete={(e) => handleDeletePreview(e, 0)}
          preview={null}
          multiple
        />
      </Grid>
      <Grid item xs={12} gap={2} display="flex">
        {files.map((file, fileIndex) => (
          <Grid item key={fileIndex} xs={12} sm={4}>
            <UploadInput
              isEditMode={isEditMode}
              onChange={handleChange}
              onDelete={(e) => handleDeletePreview(e, fileIndex)}
              preview={URL.createObjectURL(file)}
              file={file}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default UploadMultipleFiles
