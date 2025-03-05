"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      window.location.href = '/dashboards';  // เมื่อการเคลื่อนไหวเสร็จสิ้น, จะนำทางไปหน้า dashboard
    }, 600); // เวลา delay ให้กับการเคลื่อนไหว (ในที่นี้ 600ms)
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center justify-center flex-1">
        <Image
          className={`dark:invert ${isClicked ? "animate-bounce" : ""}`}
          src="/coe-lotto.png"
          alt="CoE-Lotto logo"
          width={360}
          height={100}
          priority
        />
        <p class="text-5xl font-extrabold text-purple-600 drop-shadow-lg">
  กองฉลากPSU
</p>,


        {/* ปุ่มสีม่วงและเอฟเฟกต์การคลิก */}
        <button 
          onClick={handleClick} 
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Go to Dashboard
        </button>
      </main>
    </div>
  );
}
