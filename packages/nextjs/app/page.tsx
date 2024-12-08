"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "~~/components/Search";
import BountyCard from "~~/components/bountry-card";
import Explore from "~~/components/explore";

const Home: NextPage = () => {
  const { address: connectedAddress, isConnected } = useAccount();

  // Sample bounty data
  const bountyData = {
    name: "Bounty 1",
    requirements: "Complete the task to earn rewards.",
    amount: "10 ETH",
    deadline: "2023-12-31",
  };

  return (
    <>
      <div className="flex bg-[#36d116] flex-col items-center justify-items-center h-auto p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {isConnected ? (
          <main className="flex bg-[#36d116] rounded-xl flex-col gap-8 row-start-2 items-center sm:items-start">
            <SearchBar />
            <div className="flex flex-col bg-white px-10 py-10 text-center items-center max-w-md rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p className="text-xl font-semibold text-center w-full text-black">
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link text-black">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
              <BountyCard data={bountyData} />
            </div>

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
                of different regions, and even experience the thrill of adventure sports.
              </p>
              <p className="text-xl font-semibold text-center w-full">
                Whether you are a seasoned traveler or a first-time explorer, WanderChain has something for everyone.
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
