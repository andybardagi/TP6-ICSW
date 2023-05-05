import React from 'react';
type SelectProps<T> = {
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  data: T[];
  keyExtractor: (item: T) => string;
  render: (item: T) => string;
  value?: string;
  hasError?: boolean;
  errorMessage?: string;
};

export default function SelectField<T>({
  onChange,
  label,
  placeholder,
  data,
  keyExtractor,
  render,
  value,
  hasError,
  errorMessage
}: SelectProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <select
        className={`border max-w-lg px-2 py-1 rounded-md ${
          hasError ? 'border-myRed' : 'border-myYellow '
        }`}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {placeholder && (
          <option value="" disabled selected hidden>
            {placeholder}
          </option>
        )}
        {data.map((item) => (
          <option key={keyExtractor(item)} value={keyExtractor(item)}>
            {render(item)}
          </option>
        ))}
      </select>
      {hasError ? (
        <span className="text-myRed text-sm">{errorMessage}</span>
      ) : null}
    </div>
  );
}
