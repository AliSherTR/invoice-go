import MainHeader from "@/components/main-header";
import empty from "../../public/empty.svg";
import Image from "next/image";
export default function page() {
  return (
    <div className="">
      <MainHeader />

      <div className=" h-52 mt-8">
        <Image
          height={100}
          width={100}
          alt="Invoice"
          src={empty}
          className=" w-[50%] block mx-auto "
        />

        <div className=" max-w-[350px] mx-auto space-y-2 mt-12">
          <h1 className=" text-center font-bold text-2xl font-sans">
            There is nothing here
          </h1>
          <p className=" text-sm font-semibold text-center">
            Create a new invoice by clicking the New Invoice button and get
            started
          </p>
        </div>
      </div>
    </div>
  );
}
