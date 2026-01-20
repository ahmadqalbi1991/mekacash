import { Button, ButtonProps } from "@mantine/core";

interface CustomButtonProps extends ButtonProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  title: string;
  variant?:
    | "default"
    | "filled"
    | "light"
    | "outline"
    | "transparent"
    | "white"
    | "subtle";
  onClick?: () => void;
  color?: string;
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  type?: "submit" | "reset" | "button";
}

export default function CustomButton({
  title = "",
  variant = "filled",
  leftIcon,
  onClick,
  color = "",
  radius = "md",
  size = "sm",
  className = "",
  type = "button",
  rightIcon,

  ...props
}: CustomButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      radius={radius}
      color={color}
      leftSection={leftIcon}
      rightSection={rightIcon}
      onClick={onClick}
      className={className}
      type={type}
      {...props}
    >
      <span className="max-w-full">{title}</span>
    </Button>
  );
}
