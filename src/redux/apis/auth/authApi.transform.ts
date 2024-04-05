import { ItemDetailsResponse } from 'types/interfaces/ItemDetailsResponse'
import { UserApi } from '../user/usersApi.type'
import { User } from 'types/models/User'
import { transformSingleUser } from '../user/usersApi.transform'
import { RegisterBody } from '@features/auth/signup/SignupForm.type'
import { LoginResponse, RegisterBodyApi } from './authApi.type'

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
export function decodeLoginResponse(response: LoginResponse): LoginResponse {
  return { ...response }
}
