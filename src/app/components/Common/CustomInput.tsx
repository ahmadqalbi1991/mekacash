import { TextInput } from "@mantine/core";
import CustomLabel from "./CustomLabel";

interface CustomInputProps {
    label: string;
    labelRequired?: boolean;
    placeholder?: string;
    className?: string;
    type?: string;  
}

export default function CustomInput({ label, labelRequired, placeholder, className, type = 'text' }: CustomInputProps) {
    return (
        <TextInput 
        type={type}
        label={<CustomLabel text={label} required={labelRequired} />}
        placeholder={placeholder} 
        className={className}
        />  
    );
}