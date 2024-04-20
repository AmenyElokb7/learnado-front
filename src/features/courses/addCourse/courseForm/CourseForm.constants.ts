import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import {
  TeachingTypeEnum,
  TeachingTypeFilterEnum,
} from '@config/enums/teachingType.enum'
import dayjs from 'dayjs'
import { InputConfig, InputOption } from 'types/interfaces/InputConfig'

export const BOOLEAN_OPTIONS: InputOption[] = [
  { label: 'common.yes', value: 1 },
  { label: 'common.no', value: 0 },
]
const TEACHING_TYPE_OPTIONS = [
  { label: TeachingTypeEnum.NO_TYPE, value: TeachingTypeFilterEnum.NO_TYPE },
  { label: TeachingTypeEnum.ONLINE, value: TeachingTypeFilterEnum.ONLINE },
  {
    label: TeachingTypeEnum.ON_A_PLACE,
    value: TeachingTypeFilterEnum.ON_A_PLACE,
  },
]

export const CREATE_COURSE_FORM_CONFIG: Record<string, InputConfig> = {
  title: {
    name: 'title',
    placeholder: 'course.title_placeholder',
    label: 'course.title',
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'course.title_required' },
  },
  description: {
    name: 'description',
    placeholder: 'course.description_placeholder',
    label: 'course.description',
    type: 'textarea',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: { required: 'course.description_required' },
  },
  category: {
    name: 'categoryId',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.category',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: {
      required: 'course.category_required',
    },
  },
  language: {
    name: 'languageId',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.language',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    rules: {
      required: 'course.language_required',
    },
    options: [],
  },
  isPaid: {
    name: 'isPaid',
    defaultValue: 0,
    label: 'course.isPaid',
    placeholder: '',
    options: BOOLEAN_OPTIONS,
    rules: {
      required: 'course.isPaid_required',
    },
  },
  price: {
    name: 'price',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.price',
    type: 'number',
    rules: { min: { value: 0, message: 'course.price_min' } },
  },
  discount: {
    name: 'discount',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    type: 'number',
    label: 'course.discount',
    rules: { min: { value: 0, message: 'course.discount_min' } },
  },
  facilitator: {
    name: 'facilitatorId',
    options: [],
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.select_facilitator',
    rules: { required: 'course.facilitator_required' },
  },
  isPublic: {
    name: 'isPublic',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: 1,
    label: 'course.isPublic',
    rules: { required: 'course.is_public_required' },
    options: BOOLEAN_OPTIONS,
  },
  teachingType: {
    name: 'teachingType',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.teachingType',
    options: TEACHING_TYPE_OPTIONS,
    rules: { required: 'course.teaching_type_required' },
  },
  selectedUserIds: {
    name: 'selectedUserIds',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.selectedUserIds',
    multiple: true,
    options: [],
  },
  long: {
    name: 'longitude',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.longitude',
  },
  lat: {
    name: 'latitude',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.latitude',
  },
  link: {
    name: 'link',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.link',
  },
  startTime: {
    name: 'startTime',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.startTime',
    type: 'datetime-local',
    rules: { min: dayjs().format('YYYY-MM-DDTHH:mm') },
  },
  endTime: {
    name: 'endTime',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    label: 'course.endTime',
    type: 'datetime-local',
  },
  isSequential: {
    name: 'sequential',
    placeholder: GLOBAL_VARIABLES.EMPTY_STRING,
    defaultValue: 0,
    label: 'course.isSquential',
    rules: { required: 'course.isSequential' },
    options: BOOLEAN_OPTIONS,
  },
}
