import { ChangeEvent, MouseEvent, useState } from 'react'
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
  const [preview, setPreview] = useState<null | string>(initPreview)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      formMethods.setValue(fieldName, file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleResetPreview = (event: MouseEvent<SVGSVGElement>) => {
    event.stopPropagation()
    setPreview(null)
  }

  return { preview, handleOnChange, handleResetPreview }
}

export default useUploadFile
