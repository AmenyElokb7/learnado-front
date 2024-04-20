import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions'
import { GREY } from '@config/colors/colors'
import { Edit, Delete } from '@mui/icons-material'
import { TableRow, TableCell, Stack, Tooltip, Typography } from '@mui/material'
import { LanguagesRowProps } from './LanguagesRow.type'
import { useState } from 'react'
import { useAppDispatch } from '@redux/hooks'
import { useTranslation } from 'react-i18next'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'
import trash from '@assets/logo/icon-trash.svg'
import { useDeleteLanguageMutation } from '@redux/apis/languages/languagesApi'

function LanguagesRow({ language }: LanguagesRowProps) {

  const [deleteLanguage] = useDeleteLanguageMutation()

  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleDeleteUser = async (id: number) => {
    try {
      deleteLanguage(id).unwrap()
      dispatch(showSuccess(t('language.delete_language_success')))
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      <TableRow key={language.id}>
        <TableCell>{t(language.language)}</TableCell>

        <TableCell>
          <Stack direction={'row'} spacing={2}>
            <Tooltip title={t('common.edit')}>
              <Edit color="info" cursor="pointer" onClick={() => {}} />
            </Tooltip>
            <Tooltip title={t('common.delete')}>
              <Delete
                color="error"
                cursor="pointer"
                onClick={() => setOpen(true)}
              />
            </Tooltip>
          </Stack>
        </TableCell>
      </TableRow>
      <CustomDialogActions
        open={open}
        onAccept={() => handleDeleteUser(language.id)}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}>
        <Stack direction={'column'} spacing={1} alignItems={'center'}>
          <img src={trash} width={100} />
          <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
            {t('language.delete_language')}
          </Typography>
          <Typography variant="h6" color={GREY.main}>
            {t('language.delete_language_confirm')}
          </Typography>
        </Stack>
      </CustomDialogActions>
    </>
  )
}

export default LanguagesRow
