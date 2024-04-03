import { transformPaginationResponse } from '@redux/apis/transform'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { ApiPaginationResponse } from '../type'
import { UserApi } from './usersApi.type'
import { User } from 'types/models/User'
import { generatePictureSrc } from '@utils/helpers/string.helpers'

import noUser from '@assets/images/noUser.png'

export const transformFetchUsersResponse = (
  response: ApiPaginationResponse<UserApi>,
): PaginationResponse<User> => {
  return {
    ...transformPaginationResponse(response),
    data: transformCourses(Object.values(response?.data)),
  }
}

const transformCourses = (data: UserApi[]): User[] => {
  return data?.map((user) => ({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
    coursesCount: user.courses_count,
    media: user.media.length
      ? [
          {
            modelId: user.media[0]?.model_id,
            fileName: generatePictureSrc(user.media[0]?.file_name),
          },
        ]
      : [
          {
            modelId: null,
            fileName: noUser,
          },
        ],
  }))
}
