import { Stack, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import { CategoriesRowProps } from './CategorieRow.type'
import { useState } from 'react'
import { useAppDispatch } from '@redux/hooks'
import { useTranslation } from 'react-i18next'
import { showError, showSuccess } from '@redux/slices/snackbarSlice'
import { Delete, Edit } from '@mui/icons-material'
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions'
import { GREY } from '@config/colors/colors'
import trash from '@assets/logo/icon-trash.svg'
import { useDeleteCategoryMutation } from '@redux/apis/categories/categoriesApi'

function CategoriesRow({ category, onEdit }: CategoriesRowProps) {
  const [deleteCategory] = useDeleteCategoryMutation()

  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleDeleteCategory = async (id: number) => {
    try {
      deleteCategory(id).unwrap()
      dispatch(showSuccess(t('category.delete_category_success')))
    } catch (error) {
      dispatch(showError(t('errors.general_error')))
    } finally {
      setOpen(false)
    }
  }
  const handleEditClick = (id: number) => {
    onEdit(id)
  }

  return (
    <>
      <TableRow key={category.id}>
        <TableCell>
          <img src={category.url} alt={category.title} width={70} />
        </TableCell>

        <TableCell>{t(category.title)}</TableCell>

        <TableCell>
          <Stack direction={'row'} spacing={2}>
            <Tooltip title={t('common.edit')}>
              <Edit
                color="info"
                cursor="pointer"
                onClick={() => handleEditClick(category.id)}
              />
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
        onAccept={() => handleDeleteCategory(category.id)}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}>
        <Stack direction={'column'} spacing={1} alignItems={'center'}>
          <img src={trash} width={100} />
          <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
            {t('category.delete_category')}
          </Typography>
          <Typography variant="h6" color={GREY.main}>
            {t('category.delete_category_confirm')}
          </Typography>
        </Stack>
      </CustomDialogActions>
    </>
  )
}
export default CategoriesRow
