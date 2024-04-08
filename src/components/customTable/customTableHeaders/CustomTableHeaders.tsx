import { TableCell, TableHead, TableRow } from '@mui/material'
import { CustomTableHeadersProps } from './customTableHeaders.type'
import { useTranslation } from "react-i18next";

const CustomTableHeaders = ({ columns }: CustomTableHeadersProps) => {
  const { t } = useTranslation()
  return (
    <TableHead>
      <TableRow>
        {columns.map((header) => (
          <TableCell
            key={header.id}
            align={header.align}
            sx={{ minWidth: header.minWidth }}>
            {t(header.label)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
export default CustomTableHeaders
