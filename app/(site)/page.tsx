"use client";

import { Banner } from "@/components/ui/banner";
import { usePytleStore } from "@/store/warriorStore";
import HydrationZustand from "@/zustand/HydrationZustand";

export default function Component() {
  const warriors = usePytleStore((state) => state.warriors);

  return (
    <HydrationZustand>
      <h1 className="text-4xl font-bold text-center mb-8">
        VELO WARRIORS (Alpha 1.0)
      </h1>
      <main className="flex flex-wrap justify-center items-center p-4 mb-24 gap-8 h-screen">
        {warriors.map((warrior) => (
          <Banner
            key={warrior.name}
            userName={warrior.name}
            userAvatar={warrior.avatar}
          />
        ))}
      </main>
    </HydrationZustand>
  );
}
