import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { UseFormReturn } from 'react-hook-form'

interface IUseUploadFile {
  fieldName: string
  initPreview: null | string
  formMethods?: UseFormReturn<any, any, undefined>
  index: number
  setFiles?: Dispatch<SetStateAction<Record<number, File[]>>>
}

const useUploadFile = ({
  formMethods,
  initPreview,
  fieldName,
  index,
  setFiles,
}: IUseUploadFile) => {
  const [preview, setPreview] = useState<null | string>(null)

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (formMethods) {
        formMethods?.setValue(fieldName, file)
        setPreview(URL.createObjectURL(file))
      } else {
        setFiles?.((prev) => {
          const files = prev[index] || []
          return {
            ...prev,
            [index]: [...files, file],
          }
        })
      }
    }
  }

  const handleResetPreview = (event?: MouseEvent<SVGSVGElement>) => {
    event?.stopPropagation()
    formMethods?.setValue(fieldName, null)
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
