"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "~~/components/Search";
import Explore from "~~/components/explore";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress, isConnected } = useAccount();

  return (
    <>
      <div className="flex bg-[#36d116] flex-col items-center justify-items-center h-auto p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {isConnected ? (
          <main className="flex bg-[#36d116] rounded-xl flex-col gap-8 row-start-2 items-center sm:items-start">
            <SearchBar />
            <Explore />
          </main>
        ) : (
          <main className="flex bg-[#36d116] rounded-xl flex-col gap-8 row-start-2 items-center sm:items-start">
            <div className="flex flex-col items-center justify-items-center h-auto p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
              <h1 className="text-4xl font-semibold text-center w-full">Welcome to WanderChain</h1>
              <p className="text-xl font-semibold text-center w-full">
                WanderChain is a decentralized platform that allows users to explore and discover new places to visit.
              </p>
              <p className="text-xl font-semibold text-center w-full">
                With WanderChain, you can explore and discover new places to visit, learn about the history and culture
                of different regions, and even experience the thrill of adventSure sports.
              </p>
              <p className="text-xl font-semibold text-center w-full">
                Whether you're a seasoned traveler or a first-time explorer, WanderChain has something for everyone.
              </p>
              <p className="text-xl font-semibold text-center w-full">
                So, what are you waiting for? Join the WanderChain community and start exploring the world!
              </p>
            </div>
          </main>
        )}
      </div>
    </>
  );
};

export default Home;
