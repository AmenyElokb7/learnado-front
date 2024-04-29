import { forwardRef } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { CustomFullScreenDialogProps } from './CustomFullScreenDialog.type'
import { useTranslation } from 'react-i18next'
import {
  DialogContentRoot,
  FullScreenDialogRoot,
} from './CustomFullScreenDialog.style'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CustomFullScreenDialog({
  open,
  handleClose,
  children,
}: CustomFullScreenDialogProps) {
  const { t } = useTranslation()
  return (
    <>
      <FullScreenDialogRoot
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {t('section.quiz.quiz')}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContentRoot>{children}</DialogContentRoot>
      </FullScreenDialogRoot>
    </>
  )
}
