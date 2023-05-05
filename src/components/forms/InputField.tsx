import React, { useEffect, useMemo } from 'react';
type InputProps = {
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  maxLength?: number;
  type?: string;
  hasError?: boolean;
  errorMessage?: string;
};

export default function InputField({
  onChange,
  label,
  placeholder,
  value,
  name,
  maxLength,
  type = 'text',
  hasError,
  errorMessage
}: InputProps) {


  const resValue = useMemo(() => value, [value]);
    

  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input
        name={name}
        type={type}
        maxLength={maxLength}
        className={`border w-full max-w-lg px-2 py-1 rounded-md ${
          hasError ? 'border-myRed' : 'border-myYellow '
        }`}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
      {hasError ? (
        <span className="text-myRed text-sm">{errorMessage}</span>
      ) : null}
    </div>
  );
}
