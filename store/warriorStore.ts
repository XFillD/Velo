import { create } from "zustand";
import { persist } from "zustand/middleware";

type Warrior = {
  name: string;
  avatar: string;
  pytle: number;
  winner?: boolean;
};

type Store = {
  warriors: Warrior[];
  increasePytle: (name: string) => void;
  checkWinner: () => boolean | null;
  resetWarriors: () => void;
};

export const usePytleStore = create<Store>()(
  persist(
    (set, get) => ({
      warriors: [
        { name: "Kačer", avatar: "/kaceer.jpg", pytle: 0, winner: false },
        { name: "Posérus", avatar: "/poserus.png", pytle: 0, winner: false },
        { name: "Somolis", avatar: "/somolis.jpg", pytle: 0, winner: false },
        { name: "Haubitch", avatar: "/filo.jpg", pytle: 0, winner: false },
      ],
      increasePytle: (name: any) =>
        set((state: any) => {
          const warriors = state.warriors.map((warrior: Warrior) => {
            if (warrior.name === name) {
              const newPytle = warrior.pytle + 1;
              localStorage.setItem(`${name}_pytle`, String(newPytle));
              return { ...warrior, pytle: newPytle };
            }
            return warrior;
          });
          return { warriors };
        }),
      checkWinner: () => {
        const warriors = get().warriors;
        const topWarrior = warriors.reduce((prev: any, current: any) =>
          prev.pytle > current.pytle ? prev : current
        );
        return (topWarrior.winner = true);
      },
      resetWarriors: () => {
        const warriors = get().warriors;
        const resetWarriors = warriors.map((warrior: any) => ({
          ...warrior,
          pytle: 0,
          winner: false,
        }));
        set({ warriors: resetWarriors });
      },
    }),
    {
      name: "warrior-storage", // unique name
      getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
    }
  )
);