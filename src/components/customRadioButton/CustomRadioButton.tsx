import { Controller, useFormContext } from "react-hook-form";
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
} from "@mui/material";
import { CustomRadioButtonProps } from "./CustomRadioButton.type";
import { StyledErrorIcon } from "./CustomRadioButton.style";

function CustomRadioButton({ config }: CustomRadioButtonProps) {
  const { control } = useFormContext();
  const { name, label, defaultValue, options, disabled, rules } = config;

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
              <Typography variant="h6">{label}</Typography>
              {fieldState.error && (
                <Tooltip
                  title={fieldState.error?.message || "Error"}
                  placement="right"
                >
                  <IconButton>
                    <StyledErrorIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
            <RadioGroup
              value={field.value}
              onChange={field.onChange}
              row={isMobile ? false : true}
            >
              {options?.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option?.value.toString()}
                  control={<Radio disabled={disabled} />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </>
        )}
      />
    </FormControl>
  );
}

export default CustomRadioButton;
