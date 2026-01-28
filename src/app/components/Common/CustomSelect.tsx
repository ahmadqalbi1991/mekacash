import { Select } from "@mantine/core";

export default function CustomSelect({label}: {
    label: string
}) {
    return (
        <Select
      label={label}
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
    )
}