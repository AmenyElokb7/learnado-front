import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import { styled } from '@mui/material'

export const StyledExpandIcon = styled(KeyboardArrowDownOutlinedIcon)(
  () =>
    ({ isopened }: { isopened: string }) => ({
      transform: isopened === 'true' ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2 ease-in',
    }),
)
