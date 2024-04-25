export interface ModuleHeadProps {
  expanded: boolean
  index: number
  title: string
  canDelete: boolean
  isNewSection: boolean
  onChangeExpanded: () => void
  onCreateSection?: () => void
  onDeleteSection?: () => void
  onUpdateSection?: () => void
}
