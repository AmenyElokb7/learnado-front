import { TableBody } from "@mui/material";
import { CustomTableBodyProps } from "./customTableBody.type";

function CustomTableBody({ children }: CustomTableBodyProps) {
  return <TableBody>{children}</TableBody>;
}

export default CustomTableBody;
