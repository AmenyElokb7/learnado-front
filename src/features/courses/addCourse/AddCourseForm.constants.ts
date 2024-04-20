import { Step } from '@components/CustomStepper/CustomStepper.type'
import { Section } from './sectionForm/module/Module.type'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { QuestionTypeEnum } from '@config/enums/questionType.enum'

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
