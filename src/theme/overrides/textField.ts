import { Theme } from "@mui/material";

export default function textField(theme: Theme) {
  return {
    styleOverrides: {
      root: {
        borderRadius: "5px",
        backgroundColor: theme.palette.common.white,
        "& .MuiOutlinedInput-notchedOutline": {
          border: `1px solid ${theme.palette.grey[300]}`,
        },
        "&:hover fieldset": {
          border: `1px solid ${theme.palette.primary.main} !important`,
        },
        "&.Mui-disabled": {
          backgroundColor: "transparent",
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${theme.palette.grey[300]}`,
          },
          "&:hover fieldset": {
            border: `1px solid ${theme.palette.grey[300]} !important`,
          },
        },
        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${theme.palette.primary.main}`,
          },
          "&:hover fieldset": {
            border: `2px solid ${theme.palette.primary.main} !important`,
          },
        },
      },
      input: {
        padding: "15px",
        "&::placeholder": {
          fontSize: "14px",
          lineHeight: "8px",
          color: theme.palette.grey[500],

          opacity: 1,
        },
      },
    },
  };
}
