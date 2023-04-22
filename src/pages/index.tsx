import CategoryBadge from "@/components/home/CategoryBadge";
import { Inter } from "next/font/google";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isActive, setIsActive] = useState(false);

  const categories = ["Pizza", "Hamburguesa", "Lomitos", "Empanadas", "Sushi"];

  return (
    <main>
      <div className="mx-auto max-w-lg mt-4 bg-white rounded-lg border border-slate-200 shadow-lg py-4 px-4">
        <div
          className={`w-full flex flex-row items-center gap-2 rounded-full py-2 px-4 ${
            isActive
              ? "border-2 border-cyan-600 border-inside"
              : "border-2 border-slate-100"
          }`}
        >
          <BsSearch />
          <input
            className="w-full active:border-none focus:border-none outline-none"
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            placeholder="¿Qué estás buscando?"
          />
        </div>
        <div className="flex flex-row gap-3 items-center overflow-x-auto my-3 scrollbar-hide relative py-2 rounded-lg">
          <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-transparent from-90% to-cyan-600 opacity-40"></div>
          {categories.map((c) => (
            <CategoryBadge category={c} key={c} />
          ))}
        </div>
      </div>
    </main>
  );
}
