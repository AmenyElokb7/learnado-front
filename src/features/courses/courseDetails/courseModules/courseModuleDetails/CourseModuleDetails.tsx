import CustomMediaDialog from '@components/dialogs/customMediaDialog/CustomMediaDialog'
import { CourseMediaDetailsProps } from './CourseMediaDetails.type'
import { Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { GREY } from '@config/colors/colors'

function CourseModuleDetails({
  open,
  scroll,
  section,
  onClose,
}: CourseMediaDetailsProps) {
  const VideoPlayer = ({ src }: { src?: string }) => (
    <video src={src} controls />
  )
  const ImageDisplay = ({ src }: { src?: string }) => (
    <img src={src} alt={section.title} height={400} />
  )
  const PDFViewer = ({ src }: { src?: string }) => (
    <iframe src={src} title={section.title} height={300} />
  )
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  const renderMediaContent = () => {
    const media = section?.media?.[currentMediaIndex]
    if (!media) return null

    if (media.mimeType.startsWith('video/')) {
      return <VideoPlayer src={media?.fileName} />
    } else if (media.mimeType.startsWith('image/')) {
      return <ImageDisplay src={media?.fileName} />
    } else if (media.mimeType.startsWith('application/pdf')) {
      return <PDFViewer src={media?.fileName} />
    } else {
      return null
    }
  }
  return (
    <CustomMediaDialog
      title={section.title}
      open={open}
      onClose={onClose}
      scroll={scroll}>
      {renderMediaContent()}
      <Stack direction="column" spacing={4}>
        {section?.media?.map((mediaItem, index) => (
          <Stack
            key={mediaItem.id}
            p={2}
            onClick={() => setCurrentMediaIndex(index)}
            sx={{
              cursor: 'pointer',
              backgroundColor:
                index === currentMediaIndex ? GREY.light : 'transparent',
            }}>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              {mediaItem.mimeType.startsWith('video') ? (
                <video src={mediaItem.fileName} width={100} />
              ) : mediaItem.mimeType.startsWith('image') ? (
                <img src={mediaItem.fileName} width={100} />
              ) : mediaItem.mimeType.startsWith('application/pdf') ? (
                <iframe
                  src={mediaItem.fileName}
                  style={{ overflow: 'hidden' }}
                  width={100}
                  height={100}
                  seamless={true}
                />
              ) : null}
              <Typography>{mediaItem.title || `Media ${index + 1}`}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </CustomMediaDialog>
  )
}

export default CourseModuleDetails
