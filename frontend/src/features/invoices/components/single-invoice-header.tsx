import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  status: "PAID" | "DRAFT" | "PENDING";
}
export default function SingleInvoiceHeader({ status }: Props) {
  function getStatusColor(status: string) {
    if (status === "PAID") return "bg-green-100";
    if (status === "PENDING") return "bg-yellow-200";
    return "bg-gray-200";
  }
  return (
    <div>
      <Link
        href={"/invoices"}
        className=" flex gap-1 items-center mb-4 text-xs"
      >
        <ChevronLeft className=" size-5" />
        <span>Go Back</span>
      </Link>
      <div className="px-6 py-3 shadow-sm flex justify-between rounded-lg dark:bg-[#1e2139]">
        <div className=" flex gap-4 items-center">
          <span className=" text-sm font-light text-gray-800 dark:text-gray-300">
            Status
          </span>
          <div
            className={`px-4 py-2 rounded-lg ${getStatusColor(status)} flex items-center gap-2`}
          >
            <div
              className={cn("h-3 w-3 rounded-full shrink-0", {
                "bg-green-600": status === "PAID",
                "bg-yellow-500": status === "PENDING",
                "bg-gray-800": status === "DRAFT",
              })}
            />
            <span
              className={cn("font-light text-sm", {
                "text-green-600": status === "PAID",
                "text-yellow-800": status === "PENDING",
                "text-gray-800": status === "DRAFT",
              })}
            >
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </span>
          </div>
        </div>

        <Button variant={"destructive"} className=" h-12 w-22 rounded-full">
          Delete
        </Button>
      </div>
    </div>
  );
}
