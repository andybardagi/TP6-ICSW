import React from "react";
type SelectProps<T> = {
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  data: T[];
  keyExtractor: (item: T) => string;
  render: (item: T) => string;
};

export default function SelectField<T>({
  onChange,
  label,
  placeholder,
  data,
  keyExtractor,
  render,
}: SelectProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <select
        className="border border-cyan-600 max-w-lg px-2 py-1 rounded-md"
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      >
        {data.map((item) => (
          <option key={keyExtractor(item)} value={keyExtractor(item)}>
            {render(item)}
          </option>
        ))}
      </select>
    </div>
  );
}
