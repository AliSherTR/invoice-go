import SingleInvoiceDetails from "@/features/invoices/components/single-invoice-details";
import SingleInvoiceHeader from "@/features/invoices/components/single-invoice-header";

export default function page() {
  return (
    <div className=" space-y-3">
      <SingleInvoiceHeader status="PAID" />
      <SingleInvoiceDetails />
    </div>
  );
}
