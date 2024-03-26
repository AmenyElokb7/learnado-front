import { Theme } from "@mui/material";

export default function tooltip(theme: Theme) {
  return {
    styleOverrides: {
      tooltip: {
        color:
          theme.palette.mode === "dark"
            ? theme.palette.grey[300]
            : theme.palette.grey[700],
        background:
          theme.palette.mode === "dark"
            ? theme.palette.grey[700]
            : theme.palette.grey[300],
      },
    },
  };
}
