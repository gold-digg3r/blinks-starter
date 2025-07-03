"use client";

import { Blink, useBlink } from "@dialectlabs/blinks";
import { useBlinkSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import "@dialectlabs/blinks/index.css";

import { StepCard } from "./components/step-card";

const steps = [
  {
    icon: "icon-cog",
    chip: {
      text: "Backend",
      icon: "icon-cog",
    },
    headline: "Blink API",
    text: "Blinks are headless APIs that return transactions, as well as educational metadata that can be used to render blink UIs. \n\nGet started by editing `/src/app/api/actions/donate-sol/route.ts`",
  },
  {
    icon: "icon-code",
    chip: {
      text: "Frontend",
      icon: "icon-code",
    },
    headline: "Blink UI",
    text: "Dialect's blinks UI components libraries can be used to render the blink data returned from the blink API backend. \n\nGet started by editing `src/app/page.tsx`",
  },
];

export default function Home() {
  const blinkApiUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/actions/donate-sol`
      : "http://localhost:3000/api/actions/donate-sol";

  const { adapter } = useBlinkSolanaWalletAdapter(
    "https://api.devnet.solana.com"
  );

  const { blink, isLoading, error } = useBlink({ url: blinkApiUrl });

  return (
    <main className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] min-h-[calc(100vh-64px)]">
      {/* LEFT SIDE: Steps */}
      <div className="col-span-1 p-4 lg:p-8 lg:pr-16 lg:overflow-y-auto">
        <h1 className="text-[32px] lg:text-[40px] mb-3 font-bold leading-[1]">
          Solana Blinks Starter Template
        </h1>
        <h2 className="text-[16px] lg:text-[18px] mb-2">
          Use this template project to get started developing your blink.
        </h2>
        {steps.map((step, i) => (
          <StepCard
            key={i}
            chip={step.chip}
            headline={step.headline}
            text={step.text}
          />
        ))}
      </div>

      {/* RIGHT SIDE: Blink Renderer */}
      <div className="flex items-center justify-center lg:border lg:border-gray-600 rounded-[10px] m-4 p-6">
        {!adapter ? (
          <span className="text-gray-400">Wallet adapter not available</span>
        ) : error ? (
          <span className="text-red-500">Failed to load blink: {error.message}</span>
        ) : isLoading || !blink ? (
          <span className="text-gray-400">Loading blink...</span>
        ) : (
          <div className="w-full max-w-lg p-6 rounded-xl border border-gray-700 shadow-lg">
            <Blink
              blink={blink}
              adapter={adapter}
              securityLevel="all"
              stylePreset="x-dark"
            />
          </div>
        )}
      </div>
    </main>
  );
}
