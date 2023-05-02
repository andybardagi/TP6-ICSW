import React from "react";

type CategoryBadgeProps = {
  category: string;
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <div className="bg-cyan-100 pl-1 pr-3 py-1 rounded-full flex flex-row gap-1 items-center">
      <div className="w-8 h-8 bg-white rounded-full"></div>
      {category}
    </div>
  );
}
