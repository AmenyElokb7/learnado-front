import { Theme } from "@mui/material";

export default function divider(theme: Theme) {
  return {
    styleOverrides: {
      styleOverrides: {
        root: {
          borderColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[800]
              : theme.palette.grey[200],
          opacity: 1,
        },
      },
    },
  };
}
