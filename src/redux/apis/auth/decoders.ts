import { RegisterResponse } from './usersApi.type'

export const decodeRegisterResponse = (
  response: RegisterResponse,
): RegisterResponse => {
  return { ...response }
}
