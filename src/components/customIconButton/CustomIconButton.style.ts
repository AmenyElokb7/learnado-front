import { IconButton, styled } from "@mui/material";

export const CustomIconButtonRoot = styled(IconButton)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.primary.light
      : theme.palette.background.paper,
  width: 36,
  height: 36,
  margin: "8px",
  borderRadius: "7px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));
