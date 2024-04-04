import { Stack, TextField, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { CustomTextFieldProps } from "./CustomTextField.type";

function CustomTextField({ config }: CustomTextFieldProps) {
  const { control } = useFormContext();
  const { label, name, defaultValue, type, rules, placeholder, disabled } =
    config;

  return (
    <Controller
      render={({ field, fieldState }) => {
        return (
          <Stack spacing={1}>
            <Typography variant="h6">{label}</Typography>
            <TextField
              type={type}
              placeholder={placeholder}
              variant="outlined"
              value={field.value}
              onChange={field.onChange}
              error={!!fieldState.error}
              helperText={fieldState.error && fieldState.error.message}
              fullWidth
              disabled={disabled}
            />
          </Stack>
        );
      }}
      rules={rules}
      name={name}
      defaultValue={defaultValue}
      control={control}
    />
  );
}

export default CustomTextField;
