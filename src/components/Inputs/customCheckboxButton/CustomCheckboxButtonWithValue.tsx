import { BLUE } from '@config/colors/colors'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import {
  FormControl,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyledErrorIcon } from '../customRadioButton/CustomRadioButton.style'
import { CustomCheckboxButtonProps } from './CustomCheckboxButton.type'

function CustomCheckboxButtonWithValue({ config }: CustomCheckboxButtonProps) {
  const { t } = useTranslation()
  const { control } = useFormContext()
  const { name, label, defaultValue, options, disabled, rules } = config

  return (
    <FormControl component="fieldset">
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h6" sx={{ color: BLUE.main }}>
                {t(label)}
              </Typography>
              {fieldState.error && (
                <Tooltip
                  title={t(
                    fieldState.error?.message || GLOBAL_VARIABLES.EMPTY_STRING,
                  )}
                  placement="right">
                  <IconButton>
                    <StyledErrorIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
            {options?.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value.toString()}
                control={
                  <Checkbox
                    checked={field.value.includes(option.value)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...field.value, option.value]
                        : field.value.filter(
                            (id: number) => id !== option.value,
                          )
                      field.onChange(newValue)
                    }}
                    disabled={disabled}
                  />
                }
                label={t(option.label)}
              />
            ))}
          </>
        )}
      />
    </FormControl>
  )
}

export default CustomCheckboxButtonWithValue
