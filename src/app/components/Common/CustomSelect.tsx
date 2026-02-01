import { Select } from "@mantine/core";

interface SelectDataInterface {
  label: string;
  value: string;
}

interface SelectInterface {
  label: string;
  data: SelectDataInterface[];
  className: string;
}

export default function CustomSelect({ label, data, className }: SelectInterface) {
  return (
    <Select
      label={label}
      placeholder="Pick value"
      data={data}
      className={`my-3 ${className}`}
    />
  );
}
