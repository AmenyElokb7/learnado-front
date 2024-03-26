import { Stack, styled, keyframes } from "@mui/material";
import { GlobalVariables } from "../../../config/globalVariables";

export const TopbarRoot = styled(Stack)(
  ({ theme }) =>
    ({ isscrolled }: { isscrolled: string }) => ({
      position: "fixed",
      padding: isscrolled === GlobalVariables.TrueString ? "5px" : "5px",
      display: isscrolled === GlobalVariables.TrueString ? "none" : "flex",
      justifyContent: "space-between",
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: "20px",
      width: "97%",
      margin: "20px",
      transition: theme.transitions.create("padding", {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeIn,
      }),
    })
);

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideTop = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

export const StyledScrolledAppBar = styled(Stack)(
  ({ theme }) =>
    ({ isscrolled }: { isscrolled: string }) => ({
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,

      animation:
        isscrolled === GlobalVariables.TrueString
          ? `${slideDown} 0.5s ease-out forwards`
          : `${slideTop} 0.5s ease-out forwards`,
      background: theme.palette.common.white,
      height: "100px",
      width: "100%",

      transform: "translateY(-100%)",
    })
);
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  ...theme.mixins.toolbar,
}));
