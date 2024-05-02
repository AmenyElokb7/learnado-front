import { Step } from '@components/CustomStepper/CustomStepper.type'
import { Section } from './sectionForm/module/Module.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { QuestionTypeEnum } from '@config/enums/questionType.enum'
import { TeachingTypeFilterEnum } from '@config/enums/teachingType.enum'
import { CourseFormValues } from './courseForm/CourseForm.type'

export const STEPS: Step[] = [
  {
    label: 'course.create_course',
    icon: null,
  },
  {
    label: 'course.create_section',
    icon: null,
  },
]

export const DEFAULT_SECTIONS: Section[] = [
  {
    title: GLOBAL_VARIABLES.EMPTY_STRING,
    description: GLOBAL_VARIABLES.EMPTY_STRING,
    duration: 0,
    hasQuiz: 0,
    externalUrls: [
      {
        id: 0,
        url: GLOBAL_VARIABLES.EMPTY_STRING,
        title: GLOBAL_VARIABLES.EMPTY_STRING,
      },
    ],
    quiz: {
      questions: [
        {
          question: GLOBAL_VARIABLES.EMPTY_STRING,
          type: QuestionTypeEnum.BINARY,
          isValid: 0,
          answers: [
            {
              answer: GLOBAL_VARIABLES.EMPTY_STRING,
              isValid: 0,
            },
            {
              answer: GLOBAL_VARIABLES.EMPTY_STRING,
              isValid: 0,
            },
          ],
        },
      ],
    },
  },
]

export const DEFAULT_COURSE: CourseFormValues = {
  title: GLOBAL_VARIABLES.EMPTY_STRING,
  description: GLOBAL_VARIABLES.EMPTY_STRING,
  categoryId: 0,
  facilitatorId: 0,
  languageId: 0,
  isPaid: 0,
  price: 0,
  discount: 0,
  isPublic: 0,
  link: GLOBAL_VARIABLES.EMPTY_STRING,
  startTime: GLOBAL_VARIABLES.EMPTY_STRING,
  endTime: GLOBAL_VARIABLES.EMPTY_STRING,
  sequential: 0,
  teachingType: TeachingTypeFilterEnum.NO_TYPE,
  subscribers: [],
  latitude: GLOBAL_VARIABLES.DEFAULT_LOCALIZATION.LAT,
  longitude: GLOBAL_VARIABLES.DEFAULT_LOCALIZATION.LNG,
}
