"use client";

import { useQuery } from "@tanstack/react-query";

import type { Snake } from "@/types";
import SnakeCard from "./SnakeCard";
import Closed from "./Closed";

import { useSnakeStore } from "@/store";

const fetchSnakes = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/snakes`);

  return await result.json();
};

export default function CardCollection() {
  const inVogue = useSnakeStore((state) => state.inVogue);
  const closed = useSnakeStore((state) => state.closed);
  const snakes = useSnakeStore((state) => Object.values(state.snakes));
  const setSnakes = useSnakeStore((state) => state.setSnakes);

  useQuery({
    queryKey: ["snakes"],
    queryFn: async () => {
      const snakes = await fetchSnakes();
      setSnakes(snakes);
      return snakes;
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold text-neutral-600 mb-10">
        Snake Auction
      </h1>

      {closed && <Closed />}
      <div className="flex w-full flex-wrap relative justify-center gap-4">
        {Object.values(snakes).map((snake: Snake, index) => (
          <SnakeCard
            key={snake.id}
            active={inVogue === snake.id}
            snake={snake}
          />
        ))}
      </div>
    </>
  );
}
