import { User } from 'types/models/User'
import { ConfigEnv } from '@config/configEnv'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

export const toSnakeCase = (str: string): string => {
  let result = GLOBAL_VARIABLES.EMPTY_STRING

  for (let i = 0; i < str.length; i++) {
    const character = str[i]
    if (character === GLOBAL_VARIABLES.SINGLE_SPACE) {
      result += GLOBAL_VARIABLES.EMPTY_STRING
    } else if (character === character.toUpperCase()) {
      if (i !== 0) {
        result += '_'
      }
      result += character.toLowerCase()
    } else {
      result += character
    }
  }
  return result
}

export const ToCamelCase = (str: string): string => {
  let result = GLOBAL_VARIABLES.EMPTY_STRING
  let nextIsUpper = false

  for (let i = 0; i < str.length; i++) {
    const character = str[i]
    if (character === '_') {
      nextIsUpper = true
    } else if (nextIsUpper) {
      result += character.toUpperCase()
      nextIsUpper = false
    } else {
      result += character
    }
  }
  return result
}

export const generatePictureSrc = (fileName?: string): string => {
  if (!fileName) return GLOBAL_VARIABLES.EMPTY_STRING
  return `${ConfigEnv.MEDIA_BASE_URL}/${fileName}`
}

export const getUserInitials = (user: User): string => {
  const initials = `${user.firstName[0]}${user.lastName[0]}`
  return initials.toUpperCase()
}
