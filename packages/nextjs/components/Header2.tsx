"use client";

import Link from "next/link";
import { FaucetButton, RainbowKitCustomConnectButton } from "./scaffold-eth";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Address, Avatar, Badge, Identity, Name } from "@coinbase/onchainkit/identity";
// import { ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="bg-[#36d116] border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-black">WanderChain</span>
            </Link>
          </div>
          <div className="navbar-end flex mr-4">
            <RainbowKitCustomConnectButton />
            <FaucetButton />
          </div>
        </div>
      </div>
    </header>
  );
}
