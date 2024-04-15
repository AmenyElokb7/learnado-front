export interface CustomDialogActionsProps {
  open: boolean
  onClose: () => void
  children: string
  onAccept: () => void
  onCancel: () => void
}
