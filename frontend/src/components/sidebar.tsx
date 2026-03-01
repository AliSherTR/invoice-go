"use client";

import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import logo from "../../public/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  return (
    <aside className=" w-26 dark:bg-[#1e2139] bg-[#1e2139] text-white h-svh flex flex-col rounded-r-2xl overflow-hidden ">
      <div className=" bg-[#7c5dfa] h-24 flex items-center justify-center rounded-br-2xl">
        <Link href={"/"}>
          <Image height={30} width={30} alt="Invoice" src={logo} />
        </Link>
      </div>
      <button
        className=" mt-auto  pb-6  flex items-center justify-center"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "light" ? <Moon /> : <Sun />}
      </button>
      <div className=" pb-10 pt-5 border-t-[0.5px] border-[#494E6E] flex items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className=" h-12 w-12 rounded-full flex items-center justify-center bg-white text-black">
              <User />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className=" ms-4 w-52">
            <Link href={"/login"}>
              <DropdownMenuItem>Login</DropdownMenuItem>
            </Link>

            <Link href={"/signup"}>
              <DropdownMenuItem>Sign Up</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
