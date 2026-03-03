export default function SingleInvoiceDetails() {
  return (
    <div className="px-8 py-8 shadow-sm rounded-lg dark:bg-[#1e2139]">
      <div className=" flex py-6 items-center justify-between">
        <div>
          <h1>
            <span className=" font-semibold">#</span>
            <span className=" font-light leading-0">RT3080</span>
          </h1>
          <span className=" text-xs font-light">Rebranding</span>
        </div>

        <div className=" basis-32">
          <span className=" text-xs font-light">
            19 Union Terrace London E1 3EZ United Kingdom
          </span>
        </div>
      </div>

      <div className=" grid grid-cols-4 gap-10">
        <div>
          <h3 className="text-xs font-light">Invoice Date</h3>
          <p className=" font-bold text-xl mb-5 mt-1">18 Aug 2021</p>

          <h3 className="text-xs font-light">Payment Due</h3>
          <p className=" font-bold text-xl mb-5 mt-1">19 Aug 2021</p>
        </div>
        <div>
          <h3 className="text-xs font-light">Bill To</h3>
          <p className=" font-bold text-xl mb-5 mt-1">Jensen Huang</p>

          <p className=" font-light text-xs mb-5 mt-1">
            106 Kendell Street Sharrington NR 24 5WQ United Kingdom
          </p>
        </div>
        <div className=" mx-10">
          <h3 className="text-xs font-light">Sent To</h3>
          <p className=" font-bold text-xl mb-5 mt-1">jensenh@mail.com</p>
        </div>
      </div>

      <div className=" px-2 mt-12 space-y-5">
        {/* Table Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-8 mb-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Item Name
          </span>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-center">
            Quantity
          </span>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-right">
            Price
          </span>
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 text-right">
            Total
          </span>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-8 py-2">
          <span className="text-sm text-gray-800 dark:text-gray-100">
            Website Redesign
          </span>
          <span className="text-sm text-gray-800 dark:text-gray-100 text-center">
            1
          </span>
          <span className="text-sm text-gray-800 dark:text-gray-100 text-right">
            £400.00
          </span>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100 text-right">
            £400.00
          </span>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-8 py-2">
          <span className="text-sm text-gray-800 dark:text-gray-100">
            SEO Package
          </span>
          <span className="text-sm text-gray-800 dark:text-gray-100 text-center">
            3
          </span>
          <span className="text-sm text-gray-800 dark:text-gray-100 text-right">
            £75.00
          </span>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100 text-right">
            £225.00
          </span>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 px-8 py-2">
          <span className="text-sm text-gray-800 dark:text-gray-100">
            Logo Design
          </span>
          <span className="text-sm text-gray-800 dark:text-gray-100 text-center">
            2
          </span>
          <span className="text-sm text-gray-800 dark:text-gray-100 text-right">
            £150.00
          </span>
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100 text-right">
            £300.00
          </span>
        </div>

        <div className=" py-8 rounded-lg px-8 bg-black flex items-center justify-between text-white">
          <span className=" text-xs font-light">Amount Due</span>

          <span className=" text-2xl font-bold">£ 925.00</span>
        </div>
      </div>
    </div>
  );
}
