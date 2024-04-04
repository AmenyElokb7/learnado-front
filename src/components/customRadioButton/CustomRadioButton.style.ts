import { styled } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

export const StyledErrorIcon = styled(ErrorOutline)(({ theme }) => ({
  color: theme.palette.error.main,
  height: 18,
  width: 18,
}));
