import { Skeleton, TableCell, TableRow } from "@mui/material";
import { CustomTableSkeletonProps } from "./CustomTableSkeleton.type";

function CustomTableSkeleton({
  columnCount,
  rowCount,
}: CustomTableSkeletonProps) {
  return (
    <>
      {[...Array(rowCount)].map((_, i) => (
        <TableRow key={i}>
          {[...Array(columnCount)].map((_, j) => (
            <TableCell key={j}>
              <Skeleton width={"100%"} height={"50px"} animation="wave" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export default CustomTableSkeleton;
