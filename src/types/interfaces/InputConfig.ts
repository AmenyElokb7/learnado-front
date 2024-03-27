import { RegisterOptions } from 'react-hook-form'

export interface InputConfig {
  label: string
  name: string
  placeholder: string
  defaultValue: string | number
  type?: InputType
  rules?: RegisterOptions
  disabled?: boolean
  options?: InputOption[]
}

export type InputType = 'email' | 'password' | 'number' | 'text'

export interface InputOption {
  label: string
  value: string | number
}
