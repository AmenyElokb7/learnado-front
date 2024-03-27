import { Theme } from '@mui/material'

import button from './button'
import textField from './textField'
import tooltip from './tooltip'
import divider from './divider'
import avatar from './avatar'

export default function overridesMUIComponents(theme: Theme) {
  const components = Object.assign({
    MuiButton: button(),
    MuiOutlinedInput: textField(theme),
    MuiTooltip: tooltip(theme),
    MuiDivider: divider(theme),
    MuiAvatar: avatar(),
  })

  return components
}
