"use client";
import { cn } from "@/lib/utils";
import { ChevronRight, Hash, PoundSterling } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  invoiceNumber: string;
  dueDate: string;
  benificiary: string;
  amount: number;
  status: "PAID" | "DRAFT" | "PENDING";
}

export default function InvoiceRow({
  invoiceNumber,
  dueDate,
  benificiary,
  amount,
  status,
}: Props) {
  const router = useRouter();
  function getStatusColor(status: string) {
    if (status === "PAID") return "bg-green-100";
    if (status === "PENDING") return "bg-yellow-200";
    return "bg-gray-200";
  }

  return (
    <div
      className="flex items-center p-6 rounded-lg border border-transparent hover:border shadow-sm hover:border-blue-300 focus-visible:border focus-visible:border-blue-300 focus-visible:outline-none transition-all ease-in-out duration-150 text-sm dark:bg-[hsl(233,31%,17%)] gap-4 cursor-pointer"
      role="link"
      tabIndex={0}
      onClick={() => router.push(`/invoices/${invoiceNumber}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/invoices/${invoiceNumber}`);
        }
      }}
    >
      {/* Invoice Number - fixed width */}
      <div className="flex items-center gap-1 w-24 shrink-0">
        <span className="text-gray-500">
          <Hash className="size-4" />
        </span>
        <span className="font-semibold truncate">{invoiceNumber}</span>
      </div>

      {/* Due Date - fixed width */}
      <div className="w-36 shrink-0">
        <span className="text-gray-500 dark:text-white">Due </span>
        <span className="text-gray-800 dark:text-gray-50">{dueDate}</span>
      </div>

      {/* Beneficiary - grows and truncates */}
      <div className="flex-1 min-w-0">
        <span className="text-gray-800 dark:text-gray-50 truncate block">
          {benificiary}
        </span>
      </div>

      {/* Amount - fixed width */}
      <div className="flex items-center w-28 shrink-0">
        <PoundSterling className="size-4 shrink-0" strokeWidth={3} />
        <span className="font-semibold text-gray-800 dark:text-gray-50 truncate">
          {amount}
        </span>
      </div>

      {/* Status badge - fixed width */}
      <div
        className={`flex w-32 shrink-0 justify-center p-2 px-4 items-center gap-3 ${getStatusColor(status)} rounded-lg`}
      >
        <div
          className={cn("h-3 w-3 rounded-full shrink-0", {
            "bg-green-600": status === "PAID",
            "bg-yellow-500": status === "PENDING",
            "bg-gray-800": status === "DRAFT",
          })}
        />
        <span
          className={cn("font-medium", {
            "text-green-600": status === "PAID",
            "text-yellow-800": status === "PENDING",
            "text-gray-800": status === "DRAFT",
          })}
        >
          {status.charAt(0) + status.slice(1).toLowerCase()}
        </span>
      </div>

      {/* Chevron - fixed */}
      <div className="shrink-0">
        <ChevronRight color="#7C5DFA" className="size-4" />
      </div>
    </div>
  );
}
