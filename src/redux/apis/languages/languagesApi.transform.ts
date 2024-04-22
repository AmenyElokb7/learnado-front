import { transformPaginationResponse } from '@redux/apis/transform'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { ApiPaginationResponse } from '../type'
import { Language } from 'types/models/Language'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { LanguagesCodeEnum } from '@config/enums/languagesEnum'

export const transformFetchLanguageResponse = (
  response: ApiPaginationResponse<Language>,
): PaginationResponse<Language> => {
  if (response.meta) {
    return {
      ...transformPaginationResponse(response),
      data: response.data.map((lng) => ({
        id: lng.id,
        language: transformLanguageLabel(lng.language),
      })),
    }
  }

  return {
    message: response.message,
    data: response.data.map((lng) => ({
      id: lng.id,
      language: transformLanguageLabel(lng.language),
    })),
    meta: {
      currentPage: GLOBAL_VARIABLES.PAGINATION.FIRST_PAGE,
      perPage: GLOBAL_VARIABLES.PAGINATION.ROWS_PER_PAGE,
      total: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
      count: GLOBAL_VARIABLES.PAGINATION.TOTAL_ITEMS,
    },
  }
}

export const transformLanguageLabel = (languageCode: string): string => {
  switch (languageCode) {
    case LanguagesCodeEnum.ENGLISH:
      return 'common.languages.en'
    case LanguagesCodeEnum.FRENCH:
      return 'common.languages.fr'
    default:
      return 'common.unknown'
  }
}
