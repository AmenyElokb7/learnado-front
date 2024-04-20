import { Answer, Question } from 'types/models/Quiz'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { QuestionTypeEnum } from '@config/enums/questionType.enum'
import { InputConfig, InputOption } from 'types/interfaces/InputConfig'
import { Section } from './module/Module.type'
export const BOOLEAN_OPTIONS: InputOption[] = [
  { label: 'common.yes', value: 1 },
  { label: 'common.no', value: 0 },
]

export const TRUE_FALSE_OPTIONS: InputOption[] = [
  { label: 'common.true', value: 1 },
  { label: 'common.false', value: 0 },
]

export const VALID_ANSWER_OPTIONS: InputOption[] = [
  { label: GLOBAL_VARIABLES.EMPTY_STRING, value: 1 },
]

export const QUESTION_TYPES = [
  { label: 'section.quiz.question_qcm', value: QuestionTypeEnum.QCM },
  { label: 'section.quiz.question_binary', value: QuestionTypeEnum.BINARY },
]
export const CREATE_STEP_FORM_CONFIG: Record<string, InputConfig> = {
  title: {
    name: 'title',
    placeholder: 'section.title_placeholder',
    label: 'section.title',
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'section.title_required' },
  },
  description: {
    name: 'description',
    placeholder: 'section.description_placeholder',
    label: 'section.description',
    type: 'textarea',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'section.description_required' },
  },
  duration: {
    name: 'duration',
    placeholder: 'section.duration_placeholder',
    label: 'section.duration',
    type: 'number',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'section.duration_required' },
  },
  hasQuiz: {
    name: 'hasQuiz',
    defaultValue: 0,
    label: 'section.hasQuiz',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    options: BOOLEAN_OPTIONS,
    rules: {
      required: 'section.hasQuiz_required',
    },
  },
  externalUrl: {
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'section.externalUrl',
    name: 'externalUrl',
    placeholder: 'section.externalUrl_placeholder',
  },
  externalUrlTitle: {
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'section.externalUrlTitle',
    name: 'externalUrlTitle',
    placeholder: 'section.externalUrlTitle_placeholder',
  },
  questionTitle: {
    name: 'questionTitle',
    placeholder: 'section.quiz.question_placeholder',
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'section.quiz.question_required' },
  },
  questionType: {
    name: 'questionType',
    placeholder: 'section.quiz.question_type_placeholder',
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    options: QUESTION_TYPES,
    defaultValue: QuestionTypeEnum.BINARY,
    rules: { required: 'section.quiz.type_required' },
  },

  questionIsValid: {
    name: 'questionIsValid',
    defaultValue: 0,
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    options: TRUE_FALSE_OPTIONS,
    rules: {
      required: 'section.quiz.questionIsValid_required',
    },
  },
  answerTitle: {
    name: 'answerText',
    placeholder: 'section.quiz.answer_placeholder',
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'section.quiz.answer_required' },
  },
  answerIsValid: {
    name: 'answerIsValid',
    defaultValue: 0,
    label: GLOBAL_VARIABLES.EMPTY_STRING,
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    options: [
      {
        label: GLOBAL_VARIABLES.EMPTY_STRING,
        value: 0,
      },
    ],
  },
}

export const DEFAULT_MODULE_OBJECT: Section = {
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
}

export const DEFAULT_QUESTION_OBJECT: Question = {
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
}

export const DEFAULT_ANSWER_OBJECT: Answer = {
  answer: GLOBAL_VARIABLES.EMPTY_STRING,
  isValid: 0,
}
