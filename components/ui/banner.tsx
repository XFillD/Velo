"use client";

import React from "react";
import { CardContent, Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface bannerProps {
  userName: string;
  userAvatar: string;
}

export const Banner: React.FC<bannerProps> = ({ userName, userAvatar }) => {
  const [pytle, setPytle] = React.useState<number>(0);
  const pytleNaming =
    pytle === 1
      ? "Pytel"
      : pytle > 1
      ? pytle > 5
        ? "Pytlů"
        : "Pytle"
      : "Pytlů";

  const pytleCounter = () => {
    setPytle((prevPytle) => prevPytle + 1);
  };

  return (
    <Card className="max-w-lg w-96 h-1/2 bg-gray-200 shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200 ease-in">
      <CardContent className="flex flex-col items-center justify-center gap-4 h-full">
        <Avatar className="w-48 h-48">
          <Image alt="User 1" src={userAvatar} width={500} height={500} />
        </Avatar>
        <h2 className="text-xl font-bold">{userName}</h2>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-black">(TYPE) Puk</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-black">
            {pytle} {pytleNaming}
          </span>
        </div>
        <Button
          className="w-14 h-14 rounded-full"
          size="lg"
          onClick={pytleCounter}
          style={{ fontSize: "1.5rem" }}
        >
          +
        </Button>
        <div className="w-full h-8 bg-gray-400 rounded relative">
          <div
            className="h-full bg-red-500 transition-all duration-500 ease-in-out rounded"
            style={{ width: `${100 - pytle * 5}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">
              {pytle >= 20 ? "Dásně DEAD" : "Dásně Health"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
