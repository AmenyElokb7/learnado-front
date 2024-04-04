import { styled } from "@mui/material";
import { GREY } from "@config/colors/colors";

export const MapCardContainer = styled("div")(({ theme }) => ({
  height: "300px",
  overflow: "hidden",
  borderRadius: 10,
  background: theme.palette.common.white,
  border: `1px solid ${GREY.light}`,
  position: "relative",
  padding: 26,
  
  margin: 16,
  [theme.breakpoints.down("sm")]: {
    width: "auto",
    margin: 20,
  },
  [theme.breakpoints.down("md")]: {
    width: "auto",
  },
}));
