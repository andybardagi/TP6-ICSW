import CategoryBadge from "@/components/home/CategoryBadge";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isActive, setIsActive] = useState(false);

  const categories = ["Pizza", "Hamburguesa", "Lomitos", "Empanadas", "Sushi"];

  return (
    <main>
      <div className="mx-auto max-w-lg mt-4 bg-white rounded-lg border border-slate-200 shadow-lg py-4 px-4 flex flex-col gap-0">
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
          {categories.map((c) => (
            <CategoryBadge category={c} key={c} />
          ))}
        </div>
        <div>
          <h6 className="text-center text-slate-600 text-sm">
            No encontrás lo que buscás?
          </h6>
          <Link href={"/order/new"}>
            <button className="bg-sky-500 text-white font-semibold w-full h-fit px-auto py-2 text-large rounded-full">
              Pedí lo que sea a donde quieras!
            </button>
          </Link>
        </div>
        <hr className="mt-4 mb-2 border"/>
        <div className="flex flex-col gap-2">
          <h6 className="text-center text-lg font-bold">Restaurantes adheridos</h6>
          <div className="grid grid-cols-2 grid-rows-3 content-stretch gap-2">
            <div className="col-span-1 row-span-1 grid place-items-center h-32 rounded-lg bg-sky-200">
              Restaurante 1
            </div>
            <div className="col-span-1 row-span-1 grid place-items-center h-32 rounded-lg bg-sky-400">
              Restaurante 2
            </div>
            <div className="col-span-1 row-span-1 grid place-items-center h-32 rounded-lg bg-sky-400">
              Restaurante 3
            </div>
            <div className="col-span-1 row-span-1 grid place-items-center h-32 rounded-lg bg-sky-200">
              Restaurante 4
            </div>
            <div className="col-span-1 row-span-1 grid place-items-center h-32 rounded-lg bg-sky-200">
              Restaurante 5
            </div>
            <div className="col-span-1 row-span-1 grid place-items-center h-32 rounded-lg bg-sky-400">
              Restaurante 6
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
