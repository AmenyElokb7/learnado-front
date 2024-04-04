import { transformPaginationResponse } from '@redux/apis/transform'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { ApiPaginationResponse } from '../type'
import { RegisterBodyApi, UserApi } from './usersApi.type'
import { User } from 'types/models/User'
import { generatePictureSrc } from '@utils/helpers/string.helpers'

import noUser from '@assets/images/noUser.png'
import { RegisterBody } from '@features/auth/signup/SignupForm.type'

export const transformFetchUsersResponse = (
  response: ApiPaginationResponse<UserApi>,
): PaginationResponse<User> => {
  return {
    ...transformPaginationResponse(response),
    data: transformUsers(Object.values(response?.data)),
  }
}

const transformUsers = (data: UserApi[]): User[] => {
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
            modelId: user.media[0]?.model_id,
            fileName: noUser,
          },
        ],
  }))
}
export function signupEncoder(user: RegisterBody): RegisterBodyApi {
  const { firstName, lastName, email, password, confirmPassword, role, media } =
    user
  return {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    password_confirmation: confirmPassword,
    role: role,
    media: media,
  }
}
