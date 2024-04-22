import { LoadingButton } from '@mui/lab'
import { CustomLoadingButtonProps } from './CustomLoadingButton.type'
export const CustomLoadingButton = ({
  isLoading,
  children,
  onClick,
}: CustomLoadingButtonProps) => {
  return (
    <LoadingButton
      loading={isLoading}
      onClick={onClick}
      variant="outlined"
      fullWidth>
      {children}
    </LoadingButton>
  )
}

export default CustomLoadingButton
