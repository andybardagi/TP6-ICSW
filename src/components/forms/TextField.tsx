import React from 'react';
type TextProps = {
  text: string;
  label?: string;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
};

export function TextField({ text, label, placeholder, hasError, errorMessage }: TextProps) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input
        className={`border bg-lightYellow max-w-lg px-2 py-1 rounded-md ${hasError ? 'border-myRed' : 'border-myYellow '}`}
        placeholder={placeholder}
        value={text || placeholder}
        readOnly={true}
        
      />
      {hasError ? <span className="text-myRed text-sm">{errorMessage}</span> : null}
    </div>
  );
}
