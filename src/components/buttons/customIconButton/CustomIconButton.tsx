import { CustomIconButtonProps } from "./CustomIconButton.type";
import { CustomIconButtonRoot } from "./CustomIconButton.style";

const CustomIconButton = ({
  children,
  color,
  size,
  sx,
  onClick,
}: CustomIconButtonProps) => {
  return (
    <CustomIconButtonRoot
      size={size ?? "large"}
      color={color}
      onClick={onClick}
      sx={sx}
    >
      {children}
    </CustomIconButtonRoot>
  );
};

export default CustomIconButton;
