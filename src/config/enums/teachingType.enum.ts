import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'

export enum TeachingTypeEnum {
  ON_A_PLACE = 'on_a_place',
  ONLINE = 'online',
}
export const transformTeachingType = (teachingType: string) => {
  switch (teachingType) {
    case 'on_a_place':
      return 'ON_A_PLACE'
    case 'online':
      return 'ONLINE'
    default:
      return GLOBAL_VARIABLES.EMPTY_STRING
  }
}
