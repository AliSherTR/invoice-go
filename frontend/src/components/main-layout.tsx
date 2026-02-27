import React from "react";
import { ThemeProvider } from "./theme-provider";
import Sidebar from "./sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className=" flex min-h-screen dark:bg-[#141625] ">
        <Sidebar />
        <main className=" flex-1 bg-white dark:bg-[#141625] ">
          <div className=" max-w-3xl mx-auto mt-30 flex-1">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}
