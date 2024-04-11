import { useState } from 'react'
import {
  TextField,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { CustomPasswordTextFieldProps } from './CustomPasswordTextField.type'
import { useTranslation } from 'react-i18next'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { BLUE } from '@config/colors/colors'

function CustomPasswordTextField({ config }: CustomPasswordTextFieldProps) {
  const { t } = useTranslation()
  const { control } = useFormContext()
  const { name, label, defaultValue, placeholder, disabled, rules } = config
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field, fieldState }) => (
        <Stack spacing={1}>
          <Typography variant="h6" color={BLUE.main}>
            {t(label)}
          </Typography>
          <TextField
            type={showPassword ? 'text' : 'password'}
            value={field.value}
            placeholder={t(placeholder)}
            variant="outlined"
            onChange={field.onChange}
            fullWidth
            error={Boolean(fieldState.error)}
            disabled={disabled}
            helperText={
              fieldState.error &&
              t(fieldState.error?.message || GLOBAL_VARIABLES.EMPTY_STRING)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      )}
    />
  )
}

export default CustomPasswordTextField
