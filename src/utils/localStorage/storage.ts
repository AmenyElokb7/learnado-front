import { ConfigEnv } from '@config/configEnv'
import { LocalStorageKeysEnum } from '@config/enums/localStorage.enum'
import * as CryptoJS from 'crypto-js'
import { User } from 'types/models/User'

//___________________get secret key from environment variables___________________
const secretKey = ConfigEnv.HASH_KEY
if (!secretKey) {
  throw new Error('SECRET_KEY is not defined in environment variables')
}

//___________________encrypt and decrypt___________________
const encrypt = (data: string) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString()
}
const decrypt = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}

//___________________get from local storage___________________

export const getFromLocalStorage = (
  key: LocalStorageKeysEnum,
  isObject?: boolean,
) => {
  const localStorageValue = localStorage.getItem(key)

  if (localStorageValue) {
    const decryptedValue = decrypt(localStorageValue)
    return isObject ? JSON.parse(decryptedValue) : decryptedValue
  }
  return null
}

//___________________set to local storage___________________
export const setToLocalStorage = (
  key: LocalStorageKeysEnum,
  value: string,
  isObject?: boolean,
) => {
  const cryptedValue = encrypt(isObject ? JSON.stringify(value) : value)
  localStorage.setItem(key, cryptedValue)
}

//___________________get user from local storage___________________
export const getUserFromLocalStorage = (): User | null => {
  const user = getFromLocalStorage(LocalStorageKeysEnum.User, false)

  return user ? JSON.parse(user) : null
}

//___________________remove from local storage___________________
export const removeFromLocalStorage = (key: LocalStorageKeysEnum) => {
  localStorage.removeItem(key)
}

//------------------clear local storage------------------//
export const clearLocalStorage = () => {
  localStorage.clear()
}
