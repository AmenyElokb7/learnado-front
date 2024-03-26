import { Theme } from "@mui/material";

import button from "./button";
import textField from "./textField";
import tooltip from "./tooltip";
import divider from "./divider";

export default function overridesMUIComponents(theme: Theme) {
  const components = Object.assign({
    MuiButton: button(),
    MuiOutlinedInput: textField(theme),
    MuiTooltip: tooltip(theme),
    MuiDivider: divider(theme),
  });

  return components;
}
