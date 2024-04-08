import { transformPaginationResponse } from '@redux/apis/transform'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { ApiPaginationResponse } from '../type'
import { UserApi } from './usersApi.type'
import { User } from 'types/models/User'
import { generatePictureSrc, toSnakeCase } from '@utils/helpers/string.helpers'

import noUser from '@assets/images/noUser.png'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { FieldValues } from 'react-hook-form'

export const transformFetchUsersResponse = (
  response: ApiPaginationResponse<UserApi>,
): PaginationResponse<User> => {
  return {
    ...transformPaginationResponse(response),
    data: transformUsers(Object.values(response?.data)),
  }
}

const transformUsers = (data: UserApi[]): User[] => {
  return data?.map((user) => transformSingleUser(user))
}

export const transformSingleUser = (data: UserApi): User => {
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    role: data.role,
    coursesCount: data.courses_count,
    media: data?.media?.length
      ? [
          {
            modelId: data.media[0]?.model_id ?? 0,
            fileName:
              generatePictureSrc(data.media[0]?.file_name) ??
              GLOBAL_VARIABLES.EMPTY_STRING,
          },
        ]
      : [
          {
            modelId: data.media?.[0]?.model_id ?? 0,
            fileName: noUser,
          },
        ],
  }
}

export const encodeUser = (values: FieldValues): FormData => {
  const formData = new FormData()
  Object.keys(values).forEach((key) => {
    formData.append(toSnakeCase(key), values[key])
  })
  return formData
}
