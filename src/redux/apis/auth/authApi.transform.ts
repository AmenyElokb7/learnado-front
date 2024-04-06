import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { UserApi } from '../user/usersApi.type'
import { User } from 'types/models/User'
import { transformSingleUser } from '../user/usersApi.transform'
import { RegisterBody } from '@features/auth/signup/SignupForm.type'
import {
  LoginRequest,
  LoginResponse,
  LoginResponseApi,
  RegisterBodyApi,
} from './authApi.type'
import { generatePictureSrc } from '@utils/helpers/string.helpers'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { getUserRole } from '@utils/helpers/userRole.helpers'
import { transformSingleMedia } from '../transform'

export const transformRegisterResponse = (
  response: ItemDetailsResponse<UserApi>,
): ItemDetailsResponse<User> => {
  return {
    ...response,
    data: transformSingleUser(response.data),
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
export function decodeLoginResponse(response: LoginResponseApi): LoginResponse {
  return {
    message: response.message,
    data: {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      user: {
        ...transformSingleUser(response.data.user),
        media: [
          {
            modelId: response.data.media.model_id ?? response.data.user.id,
            fileName: generatePictureSrc(response.data.media.file_name),
          },
        ],
      },
    },
  }
}

export const transformUserFromLocalStorage = (
  data: Partial<User>,
): Partial<UserApi> => {
  return {
    id: data.id,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    role: data.role,
    media: data?.media?.length
      ? [
          {
            model_id: data.media[0]?.modelId ?? 0,
            file_name:
              generatePictureSrc(data.media[0]?.fileName) ??
              GLOBAL_VARIABLES.EMPTY_STRING,
          },
        ]
      : [],
  }
}
