import { InputConfig, InputOption } from 'types/interfaces/InputConfig'

export const SIGNUP_USER_TYPES: InputOption[] = [
  {
    label: 'auth.facilitator',
    value: 2,
  },
  {
    label: 'auth.student',
    value: 0,
  },
  {
    label: 'auth.designer',
    value: 3,
  },
]

export const SIGNUP_FORM_CONFIG: Record<string, InputConfig> = {
  firstName: {
    name: 'firstName',
    placeholder: 'auth.first_name_placeholder',
    label: 'auth.first_name',
    type: 'text',
    defaultValue: '',
    rules: { required: 'auth.first_name_required' },
  },
  lastName: {
    name: 'lastName',
    placeholder: 'auth.last_name_placeholder',
    label: 'auth.last_name',
    type: 'text',
    defaultValue: '',
    rules: { required: 'auth.last_name_required' },
  },
  email: {
    name: 'email',
    placeholder: 'johnDoe@gmail.com',
    label: 'auth.email',
    type: 'email',
    defaultValue: '',
    rules: {
      required: 'auth.email_required',
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'auth.email_invalid',
      },
    },
  },
  password: {
    name: 'password',
    defaultValue: '',
    label: 'auth.password',
    placeholder: 'auth.password_placeholder',
    rules: {
      required: 'auth.password_required',
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        message: 'auth.password_pattern',
      },
    },
  },
  confirmPassword: {
    name: 'confirmPassword',
    defaultValue: '',
    label: 'auth.confirm_password',
    placeholder: 'auth.confirm_password_placeholder',
  },
  userRole: {
    name: 'role',
    placeholder: '',
    defaultValue: '',
    label: 'auth.select_role',
    rules: { required: 'auth.role_required' },
    options: SIGNUP_USER_TYPES,
  },
}
