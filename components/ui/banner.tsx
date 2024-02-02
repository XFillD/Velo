"use client";

import React, { useEffect, useState } from "react";
import { CardContent, Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePytleStore } from "@/store/warriorStore";

interface bannerProps {
  userName: string;
  userAvatar: string;
}

export const Banner: React.FC<bannerProps> = ({ userName, userAvatar }) => {
  const warriors = usePytleStore((state) => state.warriors);
  const increasePytle = usePytleStore((state) => state.increasePytle);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [isWinner, setIsWinner] = useState<boolean | undefined>(undefined);
  const resetWarriors = usePytleStore((state) => state.resetWarriors);
  const checkWinner = usePytleStore((state) => state.checkWinner);
  const options = [
    "(GAY) Mini Berry Frost",
    "Freeze X-Strong",
    "Ice Cool Strong",
  ];

  useEffect(() => {
    warriors.forEach((warrior) => {
      localStorage.setItem(`${warrior.name}_pytle`, String(warrior.pytle));
    });
  }, [warriors]);

  const warrior = warriors.find((w) => w.name === userName);

  if (!warrior) {
    return <div>No warrior found</div>;
  }

  let pytleName = "Pytlů";
  if (warrior.pytle === 1) {
    pytleName = "Pytel";
  } else if (warrior.pytle > 1 && warrior.pytle <= 5) {
    pytleName = "Pytle";
  } else {
    pytleName = "Pytlů";
  }

  const pytleCounter = () => {
    increasePytle(userName);
  };

  // useEffect(() => {
  //   const today = new Date().getDate();
  //   if (today !== currentDay) {
  //     setIsWinner(checkWinner() || undefined);
  //     resetWarriors();
  //     setCurrentDay(today);
  //   }
  // }, [currentDay, resetWarriors, setCurrentDay]);

  return (
    <Card
      className="max-w-lg w-96 h-1/2 bg-gray-200 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200 ease-in border border-gray-300"
      style={
        isWinner
          ? {
              boxShadow:
                "0 0 10px 0 #FFD700, 0 0 15px 0 #FFD700, 0 0 20px 0 #FFD700, 0 0 25px 0 #FFD700, 0 0 35px 0 #FFD700",
              borderColor: "#FFD700",
            }
          : {}
      }
    >
      <CardContent className="flex flex-col items-center justify-center gap-4 h-full pt-5">
        <Avatar className="w-24 h-24 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40">
          <Image alt="User 1" src={userAvatar} width={500} height={500} />
        </Avatar>
        <h2 className="text-xl font-bold">{userName}</h2>
        <div className="flex items-center gap-2">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="text-lg font-bold text-black"
          >
            <option value="" className="text-center" disabled hidden>
              Vyber si PUK
            </option>
            {options.map((option) => (
              <option key={option} value={option} className="text-center">
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span key={warrior.name} className="text-lg font-bold text-black">
            {warrior.pytle} {pytleName}
          </span>
        </div>
        <button
          className="w-14 h-14 rounded-full bg-black text-white text-2xl"
          onClick={pytleCounter}
          style={{ fontSize: "1.5rem" }}
        >
          +
        </button>
        <div className="w-full h-8 bg-gray-400 rounded relative">
          <div
            className="h-full bg-red-500 transition-all duration-500 ease-in-out rounded"
            style={{ width: `${100 - warrior.pytle * 5}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">
              {warrior.pytle >= 20 ? "Dásně DEAD" : "Dásně Health"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
