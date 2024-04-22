import { ReactNode } from 'react'

export interface CustomStepperProps {
  steps: Step[]
  activeStep: number
  completed: { [k: number]: boolean }
}

export interface Step {
  label: string
  icon: ReactNode
}
