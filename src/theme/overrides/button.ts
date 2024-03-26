import { Theme } from "@mui/material";

export default function button(theme: Theme) {
  return {
    defaultProps: {
      disableElevation: true,
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        fontWeight: 500,
        borderRadius: "4px",
      },
    },
  };
}
