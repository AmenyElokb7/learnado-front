import { Stack, TextField, Typography } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { CustomTextFieldProps } from './CustomTextField.type'
import { useTranslation } from 'react-i18next'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { BLUE } from '@config/colors/colors'

function CustomTextField({ config }: CustomTextFieldProps) {
  const { t } = useTranslation()
  const { control } = useFormContext()
  const {
    label,
    name,
    defaultValue,
    type,
    rules,
    placeholder,
    disabled,
    ommitedFromSubmissionData,
  } = config

  return (
    <Controller
      render={({ field, fieldState }) => {
        return (
          <Stack spacing={1}>
            <Typography variant="h6" sx={{ color: BLUE.main }}>
              {t(label)}
            </Typography>
            <TextField
              type={type}
              placeholder={t(placeholder)}
              variant="outlined"
              value={field.value}
              onChange={field.onChange}
              error={!!fieldState.error}
              helperText={
                fieldState.error &&
                t(fieldState.error?.message || GLOBAL_VARIABLES.EMPTY_STRING)
              }
              fullWidth
              disabled={disabled}
              multiline={type === 'textarea'}
              rows={6}
            />
          </Stack>
        )
      }}
      rules={rules}
      name={name}
      defaultValue={defaultValue}
      control={control}
      disabled={ommitedFromSubmissionData || disabled}
    />
  )
}

export default CustomTextField
