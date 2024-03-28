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
