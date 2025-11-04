"use client"
import {
 Navbar,
 NavbarBrand,
 NavbarContent,
 NavbarItem,
 NavbarMenuToggle,
 NavbarMenu,
 NavbarMenuItem
} from "@heroui/navbar";
import Link from "next/link";
import { Button } from "@heroui/button";
import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { useState } from "react";

// Separate component for wallet button to use hooks
const WalletButton = () => {
  const { sdk, connected, connecting, account } = useSDK();
  const [showDropdown, setShowDropdown] = useState(false);

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      setShowDropdown(false);
    }
  };

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  if (connected) {
    return (
      <div className="relative">
        <Button
          variant="flat"
          color="success"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {formatAddress(account)}
        </Button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-3 border-b">
              <p className="text-sm text-gray-600">Connected Wallet</p>
              <p className="text-xs font-mono text-gray-800">{account}</p>
            </div>
            <button
              onClick={disconnect}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <Button
      as="button"
      color="primary"
      variant="flat"
      onClick={connect}
      disabled={connecting}
    >
      {connecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};

export default function Nav() {
  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "BSChat",
      url: typeof window !== "undefined" ? window.location.host : "localhost:3000",
    },
  };

  return (
    <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
      <Navbar className="z-10000">
        <NavbarBrand>
          <p className="font-bold text-inherit">BSChat</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link aria-current="page" href="/chats">
              Chats
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="gap-3">
          <NavbarItem className="hidden lg:flex">
            <WalletButton />
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </MetaMaskProvider>
  );
}