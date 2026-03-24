import React from "react";
import Sidebar from "./sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className=" flex h-screen dark:bg-[#141625] ">
        <Sidebar />
        <main className=" flex-1 bg-white dark:bg-[#141625] overflow-y-auto ">
          <div className=" max-w-3xl mx-auto mt-15 flex-1">{children}</div>
        </main>
      </div> 
  );
}
