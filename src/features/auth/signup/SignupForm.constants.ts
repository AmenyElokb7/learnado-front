import { InputConfig, InputOption } from '../../../types/interfaces/InputConfig'

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
    placeholder: 'Enter your first name',
    label: 'First Name',
    type: 'text',
    defaultValue: '',
    rules: { required: 'First name is required' },
  },
  lastName: {
    name: 'lastName',
    placeholder: 'Enter your Last name',
    label: 'Last Name',
    type: 'text',
    defaultValue: '',
    rules: { required: 'Last name is required' },
  },
  email: {
    name: 'email',
    placeholder: 'johnDoe@gmail.com',
    label: 'Email',
    type: 'email',
    defaultValue: '',
    rules: {
      required: 'email is required',
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'invalid email',
      },
    },
  },
  password: {
    name: 'password',
    defaultValue: '',
    label: 'Password',
    placeholder: '*** *** **',
    rules: {
      required: 'password is required',
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        message:
          'password should be at least 8 caracters including  uppercase ,lowercase and number',
      },
    },
  },
  confirmPassword: {
    name: 'confirmPassword',
    defaultValue: '',
    label: 'Confirm your Password',
    placeholder: '*** *** **',
  },
  userRole: {
    name: 'role',
    placeholder: '',
    defaultValue: '',
    label: 'Select your Role',
    rules: { required: 'Role is required' },
    options: SIGNUP_USER_TYPES,
  },
}
