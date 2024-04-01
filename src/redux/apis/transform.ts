import { Media, MediaApi } from 'types/models/Media'
import { ApiPaginationResponse } from './type'
import { generatePictureSrc } from '@utils/helpers/string.helpers'
export const transformMedia = (medias: MediaApi[]): Media[] => {
  return medias.map((media) => ({
    id: media.id,
    fileName: generatePictureSrc(media.file_name),
    ModelId: media.model_id,
    mimeType: media.mime_type,
    modelType: media.model_type,
    title: media.title,
    externalUrl: media?.external_url,
  }))
}

export function transformPaginationResponse<T>(
  paginationResponse: ApiPaginationResponse<T>,
) {
  const { message, meta } = paginationResponse
  const { current_page, per_page, total } = meta
  return {
    message: message,
    meta: {
      currentPage: current_page,
      perPage: per_page,
      total: total,
      count: Math.ceil(total / per_page),
    },
  }
}
