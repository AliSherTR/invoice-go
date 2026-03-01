import EmptyState from "../components/empty-state";
import InvoiceRow from "../components/invoice-row";

export default function AllInvoicesPage() {
  return (
    <div className=" mt-8 space-y-4">
      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.99}
        status="PAID"
      />

      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.9}
        status="PENDING"
      />

      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.9}
        status="DRAFT"
      />

      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.9}
        status="PAID"
      />

      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.9}
        status="PENDING"
      />

      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.9}
        status="DRAFT"
      />

      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.9}
        status="PAID"
      />

      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.9}
        status="PENDING"
      />

      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.9}
        status="DRAFT"
      />

      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.9}
        status="PAID"
      />

      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.9}
        status="PENDING"
      />

      <InvoiceRow
        invoiceNumber="RT3080"
        dueDate="19 Aug 2021"
        benificiary="Jensen Huang"
        amount={1800.9}
        status="DRAFT"
      />
    </div>
  );
}
