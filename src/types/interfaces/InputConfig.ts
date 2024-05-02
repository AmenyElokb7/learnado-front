import { RegisterOptions } from 'react-hook-form'

export interface InputConfig {
  label: string
  name: string
  placeholder: string
  defaultValue?: string | number | number[] | string[]
  type?: InputType
  rules?: RegisterOptions
  disabled?: boolean
  options?: InputOption[]
  multiple?: boolean
  ommitedFromSubmissionData?: boolean
}

export type InputType =
  | 'email'
  | 'password'
  | 'number'
  | 'text'
  | 'date'
  | 'datetime-local'
  | 'textarea'

export interface InputOption {
  label: string
  value: string | number
}
