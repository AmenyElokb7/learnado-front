import RectangularCard from '@components/cards/rectangularCard/RectangularCard'
import { CourseOtherMediaCardProps } from './courseOtherMediaCard.type'
import { ImageList, ImageListItem } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FilesMimeTypeEnum } from '@config/enums/fileMimeType.enum'

function CourseOtherMediaCard({ medias }: CourseOtherMediaCardProps) {
  const { t } = useTranslation()
  return (
    <RectangularCard title={t('course.about')}>
      <ImageList cols={2}>
        {medias.map((item) => (
          <ImageListItem key={item.id}>
            {item.mimeType === FilesMimeTypeEnum.VIDEO ? (
              <video
                controls
                loop
                muted
                playsInline
                src={`${item.fileName}`}
                style={{ objectFit: 'cover' }}
                width="500"
                height="300"
              />
            ) : (
              <img
                srcSet={`${item.fileName}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.fileName}?w=200&h=200&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </RectangularCard>
  )
}

export default CourseOtherMediaCard
