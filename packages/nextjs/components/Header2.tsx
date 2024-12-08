"use client";

import Link from "next/link";
import { FaucetButton, RainbowKitCustomConnectButton } from "./scaffold-eth";

export function Header() {
  return (
    <header className="bg-teal-800 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-white">WanderChain</span>
            </Link>
          </div>
          <div className="navbar-end flex mr-4 z-50">
            <RainbowKitCustomConnectButton />
            <FaucetButton />
          </div>
        </div>
      </div>
    </header>
  );
}
