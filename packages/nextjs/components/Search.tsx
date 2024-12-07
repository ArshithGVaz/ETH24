"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "./ui/placeholder-and-vanish-input";

export function SearchBar() {
  const placeholders = ["Beachesgit  in Coastal Karnataka", "Forts in Hampi", "View Points in Coorg"];
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = searchTerm.trim().replace(/\s+/g, ""); // Trim spaces and remove all spaces
    router.push(`/search/${search}`);
  };
  return (
    <div className="h-[40rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Search Places you want to know about
      </h2>
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
    </div>
  );
}
