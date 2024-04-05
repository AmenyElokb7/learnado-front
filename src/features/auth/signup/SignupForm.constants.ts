import { InputConfig, InputOption } from 'types/interfaces/InputConfig'
import i18n from 'i18n'

export const SIGNUP_USER_TYPES: InputOption[] = [
  {
    label: i18n.t('auth.facilitator'),
    value: 2,
  },
  {
    label: i18n.t('auth.student'),
    value: 0,
  },
  {
    label: i18n.t('auth.designer'),
    value: 3,
  },
]

export const SIGNUP_FORM_CONFIG: Record<string, InputConfig> = {
  firstName: {
    name: 'firstName',
    placeholder: i18n.t('auth.first_name_placeholder'),
    label: 'First Name',
    type: 'text',
    defaultValue: '',
    rules: { required: i18n.t('auth.first_name_required') },
  },
  lastName: {
    name: 'lastName',
    placeholder: i18n.t('auth.last_name_placeholder'),
    label: i18n.t('auth.last_name'),
    type: 'text',
    defaultValue: '',
    rules: { required: i18n.t('auth.last_name_required') },
  },
  email: {
    name: 'email',
    placeholder: 'johnDoe@gmail.com',
    label: 'Email',
    type: 'email',
    defaultValue: '',
    rules: {
      required: i18n.t('auth.email_required'),
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: i18n.t('auth.email_invalid'),
      },
    },
  },
  password: {
    name: 'password',
    defaultValue: '',
    label: i18n.t('auth.password'),
    placeholder: '*** *** **',
    rules: {
      required: i18n.t('auth.password_required'),
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        message: i18n.t('auth.password_pattern'),
      },
    },
  },
  confirmPassword: {
    name: 'confirmPassword',
    defaultValue: '',
    label: i18n.t('auth.confirm_password'),
    placeholder: '*** *** **',
  },
  userRole: {
    name: 'role',
    placeholder: '',
    defaultValue: '',
    label: i18n.t('auth.select_role'),
    rules: { required: i18n.t('auth.role_required') },
    options: SIGNUP_USER_TYPES,
  },
}
