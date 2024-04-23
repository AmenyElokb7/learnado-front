import BodyCard from '@components/cards/bodyCard/BodyCard'
import { useTranslation } from 'react-i18next'
import CategoriesTable from './categoriesTable/CategoriesTable'
import CustomTextField from '@components/Inputs/customTextField/CustomTextField'
import UploadInput from '@components/Inputs/uploadInput/UploadInput'
import CustomFormDialog from '@components/dialogs/customFormDialog/CustomFormDialog'
import { Stack } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { CREATE_CATEGORY_FORM_CONFIG } from './categoriesTable/CreateCategory.constants'
import CustomLoadingButton from '@components/buttons/customLoadingButton/CustomLoadingButton'
import FallbackLoader from '@components/fallback/FallbackLoader'
import useManageCategories from './useManageCategories'

function CategoriesPage() {
  const { t } = useTranslation()
  const {
    open,
    isEditMode,
    preview,
    isCreating,
    isUpdating,
    isLoadingCategory,
    CategoryFormMethods,
    handleOnChangeFile,
    handleResetPreview,
    handleOnAdd,
    handleOnEdit,
    handleCloseModal,
    handleSubmit,
  } = useManageCategories()

  return (
    <BodyCard
      title={t('category.categories')}
      buttonText={t('category.add_category')}
      onClick={handleOnAdd}>
      <CategoriesTable onEdit={handleOnEdit} />
      <CustomFormDialog
        open={open}
        handleClose={handleCloseModal}
        title={isEditMode ? 'category.edit_category' : 'category.add_category'}>
        {isLoadingCategory ? (
          <FallbackLoader />
        ) : (
          <FormProvider {...CategoryFormMethods}>
            <Stack spacing={2}>
              <UploadInput
                preview={preview}
                onChange={handleOnChangeFile}
                onDelete={handleResetPreview}
              />
              <CustomTextField config={CREATE_CATEGORY_FORM_CONFIG.title} />
              <CustomLoadingButton
                isLoading={isCreating || isUpdating}
                onClick={handleSubmit}>
                {isEditMode ? t('common.update') : t('common.save')}
              </CustomLoadingButton>
            </Stack>
          </FormProvider>
        )}
      </CustomFormDialog>
    </BodyCard>
  )
}

export default CategoriesPage
