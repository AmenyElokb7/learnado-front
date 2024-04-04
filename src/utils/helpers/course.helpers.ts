import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import {
  TeachingTypeEnum,
  TeachingTypeFilterEnum,
} from '@config/enums/teachingType.enum'

export function getTeachingType(type: number) {
  switch (type) {
    case TeachingTypeFilterEnum.ONLINE:
      return TeachingTypeEnum.ONLINE as string
    case TeachingTypeFilterEnum.ON_A_PLACE:
      return TeachingTypeEnum.ON_A_PLACE as string
    default:
      return GLOBAL_VARIABLES.EMPTY_STRING
  }
}
