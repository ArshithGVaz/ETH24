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
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">YourBrand</span>
            </Link>
          </div>
          {/* <div className="flex items-center">
            <Identity
              address="0x838aD0EAE54F99F1926dA7C3b6bFbF617389B4D9"
              schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
            >
              <Avatar />
              <Name>
                <Badge />
              </Name>
              <Address />
            </Identity>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ChevronDown className="h-5 w-5" />
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
          <div className="navbar-end flex mr-4">
            <RainbowKitCustomConnectButton />
            <FaucetButton />
          </div>
        </div>
      </div>
    </header>
  );
}
