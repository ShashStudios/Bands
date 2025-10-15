"use client";

import Image from "next/image";
import Link from "next/link";
import { Waitlist } from "@/components/waitlist";
// removed unused imports

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-white">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, transparent 0%, transparent 15%, rgba(0,0,0,0.03) 25%),
              radial-gradient(circle at 80% 80%, transparent 0%, transparent 20%, rgba(0,0,0,0.02) 35%),
              linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 20px 20px, 20px 20px',
            maskImage: 'radial-gradient(ellipse 120% 100% at 50% 0%, black 0%, black 40%, transparent 70%)'
          }}
        />
      </div>

      {/* Floating Navigation Bar */}
      <nav className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 bg-white rounded-full px-8 py-3 shadow-lg border border-gray-100 w-[90%] max-w-6xl">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/b.png"
              alt="B logo"
              width={120}
              height={32}
              priority
            />
          </div>

          {/* Learn More Button */}
          <Link
            href="/learn-more"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-black text-white gap-2 hover:bg-gray-800 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Learn More
          </Link>
        </div>
      </nav>
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center relative z-10">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-black text-center max-w-4xl mt-32 whitespace-nowrap">
          Sell Your Products on ChatGPT
        </h1>

        {/* Sub-headline */}
        <p className="text-xl text-black text-center mb-6 max-w-2xl -mt-8">
          Launch your AI-native storefront in minutes. No code. No complexity.<br />
          Just plug in and sell.
        </p>

        <div id="waitlist-form" className="flex gap-4 items-center flex-col sm:flex-row justify-center">
          <Waitlist />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center relative z-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/ShashPanigrahi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Shash on X"
        >
          <Image
            aria-hidden
            src="/x.svg"
            alt="X logo"
            width={16}
            height={16}
          />
          Shash
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/EliotShytaj"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Eliot on X"
        >
          <Image
            aria-hidden
            src="/x.svg"
            alt="X logo"
            width={16}
            height={16}
          />
          Eliot
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/yus_dinov"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Yusuf on X"
        >
          <Image
            aria-hidden
            src="/x.svg"
            alt="X logo"
            width={16}
            height={16}
          />
          Yusuf
        </a>
      </footer>
    </div>
  );
}
