import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import {
  QuestionTypeEnum,
  QuestionTypeLabelEnum,
} from '@config/enums/questionType.enum'
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

export function getQuestionTypeFilter(type: number): string {
  switch (type) {
    case QuestionTypeEnum.QCM:
      return QuestionTypeLabelEnum.QCM as string
    case QuestionTypeEnum.BINARY:
      return QuestionTypeLabelEnum.BINARY as string
    case QuestionTypeEnum.OPEN:
      return QuestionTypeLabelEnum.OPEN as string
    default:
      return GLOBAL_VARIABLES.EMPTY_STRING
  }
}

export const decodeQuestionType = (type: string): QuestionTypeEnum => {
  switch (type) {
    case 'binary':
      return QuestionTypeEnum.BINARY
    case 'QCM':
      return QuestionTypeEnum.QCM
    case 'open':
      return QuestionTypeEnum.OPEN
    default:
      return QuestionTypeEnum.BINARY
  }
}

// export const getEventColor = (
//   course: Course,
// ): { backgroundColor: string; textColor: string } => {
//   if (course.isPaid) {
//     return { backgroundColor: '#e0ffcd', textColor: '#ffffff' }
//   } else if (course.isPublic) {
//     return { backgroundColor: '#ffebbb', textColor: '#ffffff' }
//   } else {
//     return { backgroundColor: '#ffcab0', textColor: '#ffffff' }
//   }
// }
