import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { InputConfig } from 'types/interfaces/InputConfig'

export const CREATE_CATEGORY_FORM_CONFIG: Record<string, InputConfig> = {
  title: {
    label: 'category.title',
    name: 'category',
    type: 'text',
    defaultValue: GLOBAL_VARIABLES.EMPTY_STRING,
    placeholder: 'category.title_placeholder',
    rules: {
      required: 'category.title_required',
    },
  },
}
