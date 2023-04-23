import React from "react";
type TextProps = {
  text: string;
  label?: string;
  placeholder?: string;
};

export function TextField({text, label, placeholder}: TextProps) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input
        className="border border-cyan-600 max-w-lg px-2 py-1 rounded-md"
        placeholder={placeholder}
        value={text || ''}
        readOnly={true}
      />
    </div>
  );
}
