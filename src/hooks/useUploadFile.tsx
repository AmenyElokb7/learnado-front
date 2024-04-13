import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface IUseUploadFile {
  fieldName: string
  initPreview: null | string
  formMethods: UseFormReturn
}

const useUploadFile = ({
  formMethods,
  initPreview,
  fieldName,
}: IUseUploadFile) => {
  const [preview, setPreview] = useState<null | string>(null)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      formMethods.setValue(fieldName, file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleResetPreview = (event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation()
    formMethods.setValue(fieldName, null)
    setPreview(null)
  }

  useEffect(() => {
    if (initPreview) {
      setPreview(initPreview)
    }
  }, [initPreview])

  return { preview, handleOnChange, handleResetPreview }
}

export default useUploadFile
