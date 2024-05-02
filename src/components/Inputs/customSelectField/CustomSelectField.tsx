import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import {
  Chip,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CustomSelectFieldProps } from './CustomSelectField.type'
import { BLUE } from '@config/colors/colors'

function CustomSelectField({ config }: CustomSelectFieldProps) {
  const { t } = useTranslation()
  const { control } = useFormContext()
  const { label, name, defaultValue, options, rules, disabled, multiple } =
    config

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
              value={field.value || []}
              onChange={(event) => {
                const value = event.target.value
                if (typeof value === 'string') {
                  field.onChange([value])
                } else {
                  field.onChange(value)
                }
              }}
              error={!!fieldState.error}
              disabled={disabled}
              multiple={multiple}
              fullWidth
              renderValue={(selected: number[] | number | string) => {
                if (!multiple) {
                  let selectedLabel = GLOBAL_VARIABLES.EMPTY_STRING

                  if (typeof selected === 'string') {
                    selectedLabel = options?.find(
                      (option) => String(option.value) === selected,
                    )?.label as string
                  }

                  if (typeof selected === 'number') {
                    selectedLabel = options?.find(
                      (option) => Number(option.value) === selected,
                    )?.label as string

                    return (
                      <>{t(selectedLabel || GLOBAL_VARIABLES.EMPTY_STRING)}</>
                    )
                  }

                  return (
                    <>{t(selectedLabel || GLOBAL_VARIABLES.EMPTY_STRING)}</>
                  )
                }

                return (
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                    {(selected as number[]).map((selectedUserId, index) => {
                      const selectedOption = options?.find(
                        (option) => Number(option.value) === selectedUserId,
                      )

                      return (
                        <Chip
                          sx={{ zIndex: 99999 }}
                          key={index}
                          label={selectedOption?.label}
                          onDelete={(e) => {
                            e.stopPropagation()
                            const newSelected = (selected as number[]).filter(
                              (selectedId) => selectedId !== selectedUserId,
                            )
                            field.onChange(newSelected)
                          }}
                        />
                      )
                    })}
                  </Stack>
                )
              }}>
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
