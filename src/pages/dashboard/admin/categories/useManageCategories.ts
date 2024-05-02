import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@redux/hooks'
import {
  useCreateCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from '@redux/apis/categories/categoriesApi'
import useUploadFile from 'src/hooks/useUploadFile'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { showSuccess } from '@redux/slices/snackbarSlice'
import { IError } from 'types/interfaces/Error'
import useError from 'src/hooks/useError'

export default function useManageCategories() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)

  const isEditMode = Boolean(categoryId)

  const CategoryFormMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  })

  // Error handling Hook
  const { getError } = useError({
    formMethods: CategoryFormMethods,
  })

  // APIs CALLS
  const [createCategoryApiAction, { isLoading: isCreating }] =
    useCreateCategoryMutation()
  const [updateCategoryApiAction, { isLoading: isUpdating }] =
    useUpdateCategoryMutation()
  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetCategoryByIdQuery(categoryId, {
      skip: !categoryId,
    })
  const category = categoryData?.data

  // Upload File Hook
  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    formMethods: CategoryFormMethods,
    fieldName: 'media',
    initPreview:
      isEditMode && categoryId !== undefined && category?.url
        ? String(category?.url)
        : GLOBAL_VARIABLES.EMPTY_STRING,
    index: 0,
  })

  // OnClick on Edit icon
  const handleOnEdit = (categoryId: number) => {
    setCategoryId(categoryId)
    CategoryFormMethods.setValue('category', category?.title)
    setOpen(true)
  }

  // OnClick on Add Category button
  const handleOnAdd = () => {
    setOpen(true)
    CategoryFormMethods.reset()
  }

  // Close Modal
  const handleCloseModal = () => {
    handleResetPreview()
    CategoryFormMethods.reset()
    setCategoryId(undefined)
    setOpen(false)
  }

  // Submit Form
  const handleSubmit = CategoryFormMethods.handleSubmit(async (values) => {
    try {
      if (isEditMode) {
        await updateCategoryApiAction({
          id: Number(categoryId),
          category: values,
        }).unwrap()
        dispatch(showSuccess(t('category.update_category_success')))
      } else {
        await createCategoryApiAction(values).unwrap()
        CategoryFormMethods.reset()
        dispatch(showSuccess(t('category.create_category_success')))
      }
      handleCloseModal()
    } catch (error) {
      getError(error as IError)
    }
  })

  useEffect(() => {
    if (category) {
      CategoryFormMethods.setValue('media', category?.url)
      CategoryFormMethods.setValue('category', category?.title)
    }

    return () => {
      CategoryFormMethods.reset()
    }
  }, [category])

  return {
    open,
    categoryId,
    isEditMode,
    category,
    preview,
    isCreating,
    isUpdating,
    isLoadingCategory,
    CategoryFormMethods,
    handleOnChangeFile: handleOnChange,
    handleResetPreview,
    handleOnAdd,
    handleOnEdit,
    handleCloseModal,
    handleSubmit,
  }
}
