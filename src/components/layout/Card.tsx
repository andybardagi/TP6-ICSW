import React from 'react';

type CardProps = {
  title?: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white px-4 py-4 rounded-lg border border-slate-200 shadow-lg">
      {title ? <h3 className="text-xl font-bold mb-1">{title}</h3> : null}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
