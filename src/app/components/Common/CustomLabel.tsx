export default function CustomLabel({ text, required }: { text: string; required?: boolean }) {
    return (
        <label className="block text-sm font-medium text-gray-700">
            {text} {required && <span className="text-red-500">*</span>}
        </label>
    );
}