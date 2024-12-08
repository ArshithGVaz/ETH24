"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "./ui/placeholder-and-vanish-input";

export const autoCompleteData = [
  "Beaches in Coastal Karnataka",
  "Forts in Hampi",
  "View Points in Coorg",
  "Temples in Belur",
  "Waterfalls in Chikmagalur",
  "Wildlife Sanctuaries in Karnataka",
  "Trekking Spots in Western Ghats",
  "Historical Sites in Badami",
  "Coffee Plantations in Kodagu",
  "Adventure Sports in Dandeli",
  "Mysore Palace",
  "Gokarna Beaches",
  "Jog Falls",
  "Bandipur National Park",
  "Nandi Hills",
];

export function SearchBar() {
  const placeholders = ["Beaches in Coastal Karnataka", "Forts in Hampi", "View Points in Coorg"];
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filteredSuggestions = autoCompleteData.filter(item => item.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = searchTerm.trim().replace(/\s+/g, ""); // Trim spaces and remove all spaces
    router.push(`/search/${search}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[20rem] flex flex-col justify-center items-center px-4 relative">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-black text-black">
        Search Places you want to know about
      </h2>
      <div className="w-full max-w-xl relative">
        <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
        {showSuggestions && suggestions.length > 0 && (
          <ul
            ref={suggestionsRef}
            className="absolute z-10 w-full rounded-xl bg-white dark:bg-gray-100 mt-1 shadow-lg max-h-60 overflow-auto"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-200 cursor-pointer text-black"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
