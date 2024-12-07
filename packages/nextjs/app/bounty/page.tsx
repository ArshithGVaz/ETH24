"use client";

import React from "react";
import BountyCard from "~~/components/bountry-card";

// type Props = {};

const data = [
  {
    host: "0x12431qew80348",
    amount: 2000,
    name: "abc",
    requirements: "ab",
    deadline: "27-01-2024",
    totalVotes: 70,
  },
  {
    host: "0x248sd78ghe93kj",
    amount: 1500,
    name: "def",
    requirements: "cd",
    deadline: "05-02-2024",
    totalVotes: 120,
  },
  {
    host: "0x47jdf9834lkjhf",
    amount: 3000,
    name: "ghi",
    requirements: "ef",
    deadline: "14-02-2024",
    totalVotes: 50,
  },
  {
    host: "0x8sdh329fjwe78q",
    amount: 2500,
    name: "jkl",
    requirements: "gh",
    deadline: "10-03-2024",
    totalVotes: 85,
  },
  {
    host: "0x9d823jkdh74we9d",
    amount: 1800,
    name: "mno",
    requirements: "ij",
    deadline: "22-04-2024",
    totalVotes: 95,
  },
  {
    host: "0x12ksdf8934hk33",
    amount: 2200,
    name: "pqr",
    requirements: "kl",
    deadline: "19-05-2024",
    totalVotes: 110,
  },
];

const Bounty = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1>Check out the Bounties</h1>
        <div className="grid grid-cols-3 gap-x-9 w-full px-20 max-w-screen justify-center items-center">
          {data.map(info => (
            <BountyCard key={info.name} data={info} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Bounty;
