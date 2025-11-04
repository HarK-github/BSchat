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
import { useState } from "react";

// Separate component for wallet button to use hooks
 
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
   );
}