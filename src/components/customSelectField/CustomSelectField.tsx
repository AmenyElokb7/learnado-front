import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CustomSelectFieldProps } from './CustomSelectField.type'
import { BLUE } from '@config/colors/colors'

function CustomSelectField({ config }: CustomSelectFieldProps) {
  const { t } = useTranslation()
  const { control } = useFormContext()
  const { label, name, defaultValue, options, rules, disabled } = config

  return (
    <Controller
      render={({ field, fieldState }) => (
        <>
          <Stack spacing={1}>
            <InputLabel sx={{ color: BLUE.main }} id={`${name}-label`}>
              {t(label)}
            </InputLabel>
            <Select
              labelId={`${name}-label`}
              value={field.value}
              onChange={field.onChange}
              error={!!fieldState.error}
              disabled={disabled}
              fullWidth>
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.label)}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          {fieldState.error && (
            <Typography color="error" variant="caption">
              {t(fieldState.error.message || GLOBAL_VARIABLES.EMPTY_STRING)}
            </Typography>
          )}
        </>
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue || GLOBAL_VARIABLES.EMPTY_STRING}
      control={control}
    />
  )
}

export default CustomSelectField
