"use client";
import { useEffect, useState } from "react";

interface HydrationZustandProps {
  children: React.ReactNode;
}

const HydrationZustand: React.FC<HydrationZustandProps> = ({ children }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div> : null}</>;
};

export default HydrationZustand;
