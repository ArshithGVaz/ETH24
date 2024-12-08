import { SearchBar } from "@/components/Search";
import Explore from "@/components/explore";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center h-[90vh] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <SearchBar />
        <Explore />
      </main>
    </div>
  );
}
