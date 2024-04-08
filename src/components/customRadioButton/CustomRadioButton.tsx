import { Controller, useFormContext } from 'react-hook-form'
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
  IconButton,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { CustomRadioButtonProps } from './CustomRadioButton.type'
import { StyledErrorIcon } from './CustomRadioButton.style'
import { useTranslation } from 'react-i18next'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { BLUE } from '@config/colors/colors'

function CustomRadioButton({ config }: CustomRadioButtonProps) {
  const { t } = useTranslation()
  const { control } = useFormContext()
  const { name, label, defaultValue, options, disabled, rules } = config

  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              row={isMobile ? false : true}>
              {options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option?.value.toString()}
                  control={<Radio disabled={disabled} />}
                  label={t(option.label)}
                />
              ))}
            </RadioGroup>
          </>
        )}
      />
    </FormControl>
  )
}

export default CustomRadioButton
