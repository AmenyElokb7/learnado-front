import { Stack, styled } from '@mui/material'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import { GREY } from '@config/colors/colors'

export const ModuleRoot = styled(Stack)(
  ({ isdragging, candrag }: { isdragging: string; candrag: string }) => ({
    borderRadius: '10px',
    border: `1px solid ${GREY.light}`,
    padding: '20px',
    opacity: isdragging === GLOBAL_VARIABLES.TRUE_STRING ? 0.5 : 1,
    cursor: candrag === GLOBAL_VARIABLES.TRUE_STRING ? 'pointer' : 'auto',
    transform:
      isdragging === GLOBAL_VARIABLES.TRUE_STRING ? 'scale(0.8)' : 'scale(1)',
    transition: 'transform 0.2s ease-in-out',
  }),
)
export const QuizRoot = styled(Stack)(() => ({
  borderRadius: '10px',
  border: `1px solid ${GREY.light}`,
  padding: '20px',
}))

export const StyledArrowIcon = styled(ArrowForwardIosOutlinedIcon)(
  ({ expanded }: { expanded: string }) => ({
    fontSize: '16px',
    cursor: 'pointer',
    transform:
      expanded === GLOBAL_VARIABLES.TRUE_STRING
        ? 'rotate(90deg)'
        : 'rotate(0deg)',
  }),
)
