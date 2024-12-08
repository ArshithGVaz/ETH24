"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "~~/components/Search";
import BountyCard from "~~/components/bountry-card";
import Explore from "~~/components/explore";

const Home: NextPage = () => {
  const { address: connectedAddress, isConnected } = useAccount();

  // Sample bounty data
  const bountyData1 = {
    name: "Bounty 1",
    requirements: "Complete the task to earn rewards.",
    amount: "10 ETH",
    deadline: "2023-12-31",
  };
  const bountyData2 = {
    name: "Bounty 2",
    requirements: "Fix bugs in the application.",
    amount: "5 ETH",
    deadline: "2023-11-30",
  };
  const bountyData3 = {
    name: "Bounty 3",
    requirements: "Design a new user interface.",
    amount: "8 ETH",
    deadline: "2024-01-15",
  };

  return (
    <>
      <div className="flex bg-[#36d116] flex-col items-center h-auto p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {isConnected ? (
          <main className="flex flex-col gap-8 items-center sm:items-start">
            <SearchBar />
            <div className="flex flex-col gap-6 w-full max-w-4xl">
              {/* Block Explorer Section */}
              <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-md">
                <MagnifyingGlassIcon className="h-8 w-8 text-gray-600" />
                <p className="text-lg font-semibold text-gray-800">
                  Explore your local transactions with the{" "}
                  <Link href="/blockexplorer" passHref className="text-blue-600 underline">
                    Block Explorer
                  </Link>{" "}
                  tab.
                </p>
              </div>

              {/* Bounty Cards Section */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <BountyCard data={bountyData1} />
                <BountyCard data={bountyData2} />
                <BountyCard data={bountyData3} />
              </div>
            </div>
            <Explore />
          </main>
        ) : (
          <main className="flex flex-col gap-8 items-center text-center">
            <h1 className="text-4xl font-semibold">Welcome to WanderChain</h1>
            <p className="text-xl">
              WanderChain is a decentralized platform that allows users to explore and discover new places to visit.
            </p>
            <p className="text-xl">
              With WanderChain, you can explore and discover new places to visit, learn about the history and culture of
              different regions, and even experience the thrill of adventure sports.
            </p>
            <p className="text-xl">
              Whether you are a seasoned traveler or a first-time explorer, WanderChain has something for everyone.
            </p>
            <p className="text-xl">
              So, what are you waiting for? Join the WanderChain community and start exploring the world!
            </p>
          </main>
        )}
      </div>
    </>
  );
};

export default Home;
