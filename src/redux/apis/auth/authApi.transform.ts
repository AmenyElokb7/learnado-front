import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { UserApi } from '../user/usersApi.type'
import { User } from 'types/models/User'
import { transformSingleUser } from '../user/usersApi.transform'
import { RegisterBody } from '@features/auth/signup/SignupForm.type'
import {
  LoginResponse,
  LoginResponseApi,
  RegisterBodyApi,
} from './authApi.type'
import { generatePictureSrc } from '@utils/helpers/string.helpers'

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
