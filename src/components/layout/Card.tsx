import React from "react";

type CardProps = {
  title?: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-gray-300 px-4 py-4 rounded-lg shadow-lg">
      {title ? <h3 className="text-xl font-bold mb-1">{title}</h3> : null}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
