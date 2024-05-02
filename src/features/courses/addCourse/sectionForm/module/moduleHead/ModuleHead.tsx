import { IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { StyledArrowIcon } from '../Module.style'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { useTranslation } from 'react-i18next'
import { Edit } from '@mui/icons-material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ModuleHeadProps } from './ModuleHead.type'

function ModuleHead({
  expanded,
  index,
  title,
  canDelete,
  isNewSection,
  onChangeExpanded,
  onDeleteSection,
  onUpdateSection,
}: ModuleHeadProps) {
  const { t } = useTranslation()
  return (
    <Stack
      direction="row"
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <StyledArrowIcon
          onClick={onChangeExpanded}
          expanded={
            expanded
              ? GLOBAL_VARIABLES.TRUE_STRING
              : GLOBAL_VARIABLES.FALSE_STRING
          }
        />
        <Typography variant="h3" color="primary">
          {t('section.section', { index: index + 1 })}: {title}
        </Typography>
      </Stack>
      <Stack direction={'row'} spacing={1}>
        {!isNewSection && (
          <Tooltip title={t('section.update')}>
            <IconButton color="info" onClick={onUpdateSection}>
              <Edit />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title={t('section.delete')}>
          <IconButton
            onClick={onDeleteSection}
            disabled={!canDelete}
            sx={{
              color: (theme) =>
                canDelete
                  ? theme.palette.error.main
                  : theme.palette.action.disabled,
            }}>
            <DeleteOutlineOutlinedIcon fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  )
}

export default ModuleHead
