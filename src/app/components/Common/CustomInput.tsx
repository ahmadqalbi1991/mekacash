import { TextInput, TextInputProps } from "@mantine/core";
import CustomLabel from "./CustomLabel";
import clsx from "clsx";

interface CustomInputProps extends TextInputProps {
  label?: string;
  labelRequired?: boolean;
  placeholder?: string;
  className?: string;
  type?: string;
  styleInput?: string;
  styleLabel?: string;
}

export default function CustomInput({
  label,
  labelRequired,
  placeholder,
  className,
  type = "text",
  styleInput,
  ...props
}: CustomInputProps) {
  return (
    <TextInput
      type={type}
      label={<CustomLabel text={label || ''} required={labelRequired} />}
      placeholder={placeholder}
      className={className}
      classNames={{
        input: clsx(
          "h-[40px] border border-1 border-border-lightGray bg-inherit w-full focus:border-textColor-black07 placeholder:font-normal placeholder:text-xs sm:placeholder:text-sm placeholder-text-textColor-gray400 rounded-lg px-4",
          styleInput,
          props.error && "!border-[red]",
        ),
        error: clsx("!text-[#ED6060] !text-xs mt-1"),
      }}
      {...props}
    />
  );
}
