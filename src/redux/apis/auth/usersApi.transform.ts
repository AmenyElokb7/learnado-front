import { transformPaginationResponse } from '@redux/apis/transform'
import { PaginationResponse } from 'types/interfaces/Pagination'
import { ApiPaginationResponse } from '../type'
import { RegisterBodyApi, UserApi } from './usersApi.type'
import { User } from 'types/models/User'
import { generatePictureSrc } from '@utils/helpers/string.helpers'

import noUser from '@assets/images/noUser.png'
import { RegisterBody } from '@features/auth/signup/SignupForm.type'
import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

export const transformFetchUsersResponse = (
  response: ApiPaginationResponse<UserApi>,
): PaginationResponse<User> => {
  return {
    ...transformPaginationResponse(response),
    data: transformUsers(Object.values(response?.data)),
  }
}

export const transformRegisterResponse = (
  response: ItemDetailsResponse<UserApi>,
): ItemDetailsResponse<User> => {
  return {
    ...response,
    data: transformSingleUser(response.data),
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

export function signupEncoder(user: RegisterBody): RegisterBodyApi {
  const { firstName, lastName, email, password, confirmPassword, role } = user
  return {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    password_confirmation: confirmPassword,
    role: role,
  }
}
