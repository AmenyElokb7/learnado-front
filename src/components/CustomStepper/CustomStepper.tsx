import { useTranslation } from 'react-i18next'
import { Step, StepLabel, Stepper } from '@mui/material'

import { CustomStepperProps } from './CustomStepper.type'

function CustomStepper({ steps, activeStep, completed }: CustomStepperProps) {
  const { t } = useTranslation()
  return (
    <Stepper alternativeLabel activeStep={activeStep}>
      {steps.map((step, index) => (
        <Step completed={completed[index]} key={index}>
          <StepLabel color="inherit">{t(step.label)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default CustomStepper
