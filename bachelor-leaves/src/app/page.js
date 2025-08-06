"use client";

import Image from "next/image";
import { useState } from "react";
import NavBar from "./components/nav-bar";
import MainTop from "./components/main-top";
import RequestList from "./components/request-list";

export default function Home() {
  const [selected, setSelected] = useState("Богино хугацааны чөлөө");
  return (
    <div className="flex min-h-screen">
      <NavBar selected={selected} onSelect={setSelected}/>
      <main className="flex-grow flex items-start bg-gray-800 p-8 flex-col gap-8 w-full">
        <MainTop leaveType={selected}/>
        <RequestList />
        <div className="flex-1"></div>
        <footer className="text-center text-gray-500 text-sm">
          © 2024 Bachelor Leaves. All rights reserved.
        </footer>
      </main>
    </div>
  );
}