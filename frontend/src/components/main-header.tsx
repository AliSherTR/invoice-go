"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import InvoiceForm from "@/features/invoices/components/invoice-form";
import { ScrollArea } from "./ui/scroll-area";

const statuses = ["Draft", "Pending", "Paid"];

export default function MainHeader() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (status: string) => {
    setSelected((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Invoices
        </h1>
        <span className="text-sm mt-2">No Invoices</span>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className=" bg-transparent">
            <Button
              variant="outline"
              className="bg-transparent dark:bg-transparent flex items-center gap-2 border-0 shadow-none"
            >
              Filter By Status
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 p-2">
            {statuses.map((status) => (
              <div
                key={status}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-accent cursor-pointer"
                onClick={() => toggle(status)}
              >
                <Checkbox
                  checked={selected.includes(status)}
                  onCheckedChange={() => toggle(status)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="text-sm">{status}</span>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Sheet>
          <SheetTrigger asChild>
            <Button className=" px-1.5 pe-3 rounded-full h-12 bg-[#7C5DFA] hover:bg-[#9277FF] text-white">
              <div className=" h-8 w-8 rounded-full bg-white flex items-center justify-center">
                <Plus color="blue" strokeWidth={4} />
              </div>
              <span>New Invoice</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className=" dark:bg-[hsl(231,30%,11%)] sm:max-w-xl overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] "
          >
            <SheetHeader>
              <SheetTitle>New Invoice</SheetTitle>
            </SheetHeader>
            <ScrollArea className=" h-screen px-5">
              <InvoiceForm />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
