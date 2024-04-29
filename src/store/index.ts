import { create } from "zustand";

import { Snake } from "@/types";

interface SnakeState {
  inVogue: string;
  closed: string;
  snakes: Record<string, Snake>;
  bids: Record<string, number[]>;
  setSnakes: (snakes: Snake[]) => void;
  clearClosed: () => void;
  setBids: (id: string, bids: number[]) => void;
  setInVogue: (snakeId: string) => void;
}

export const useSnakeStore = create<SnakeState>((set, get) => ({
  inVogue: "",
  closed: "",
  snakes: {},
  bids: {},
  setBids: (id, bids) => {
    set((state) => {
      state.bids[id] = bids;
      return state;
    });
  },
  clearClosed: () => set({ closed: "" }),
  setSnakes: (snakes) => {
    const newSnakes = snakes.reduce((acc, snake: Snake) => {
      acc[snake.id] = snake;
      return acc;
    }, {} as Record<string, Snake>);
    set({ snakes: newSnakes });
  },
  setInVogue: (snakeId) => {
    set({ inVogue: snakeId });
  },
}));
