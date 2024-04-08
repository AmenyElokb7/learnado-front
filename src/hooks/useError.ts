import { HttpStatusEnum } from '@config/enums/httpStatus.enum'
import { useAppDispatch } from '@redux/hooks'
import { showError } from '@redux/slices/snackbarSlice'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { IError } from 'types/interfaces/Error'

interface UseErrorProps {
  formMethods: UseFormReturn
}

function useError({ formMethods }: UseErrorProps) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const setInputError = (key: string, value: string) => {
    formMethods.setError(key, { message: value })
  }

  const getError = (error: IError) => {
    const { status, data } = error

    switch (status) {
      case HttpStatusEnum.UNPROCESSABLE_CONTENT:
        for (const [key, value] of Object.entries(data.errors)) {
          setInputError(key, value)
        }
        break
      case HttpStatusEnum.UNAUTHORIZED:
        for (const [key, value] of Object.entries(data.errors)) {
          setInputError(key, value)
        }
        break
      default:
        dispatch(showError(t('errors.general_error')))
        break
    }
  }

  return { getError, setInputError }
}

export default useError
