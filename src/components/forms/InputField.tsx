import React from "react";
type InputProps = {
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  name?: string;
  maxLength?: number;
  type?: string;
};

export default function InputField({
  onChange,
  label,
  placeholder,
  name,
  maxLength,
  type = "text",
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input
        name={name}
        type={type}
        maxLength={maxLength}
        className="border border-cyan-600 max-w-lg px-2 py-1 rounded-md"
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
