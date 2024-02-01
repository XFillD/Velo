import { Banner } from "@/components/ui/banner";

export default function Component() {
  const warriors = [
    { name: "Kačer", avatar: "/kaceer.jpg" },
    { name: "Posérus", avatar: "/poserus.png" },
    { name: "Somolis", avatar: "/somolis.jpg" },
    { name: "Haubitch", avatar: "/filo.jpg" },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-8">VELO WARRIORS</h1>
      <main className="flex flex-wrap justify-center items-center p-4 mb-24 gap-8 h-screen">
        {warriors.map((warrior) => (
          <Banner userName={warrior.name} userAvatar={warrior.avatar} />
        ))}
      </main>
    </>
  );
}
