import { clsx } from "clsx";
import Image from "next/image";

import { Snake, SnakeStage } from "@/types";
import useSnakeImageSrc from "@/types/useSnakeImage";
import { useSnakeStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

interface Props {
  snake: Snake;
  active?: boolean;
}

export default function SnakeCard({ snake, active = false }: Readonly<Props>) {
  const bids = useSnakeStore((state) => state.bids[snake.id]) ?? [];

  const setBids = useSnakeStore((state) => state.setBids);
  const closed = useSnakeStore((state) => state.closed);
  const imageSrc = useSnakeImageSrc(snake.id);

  useQuery({
    queryKey: ["bids", snake.id],
    queryFn: async () => {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bids?snake-id=${snake.id}`
      );

      const bids = await result.json();
      setBids(snake.id, bids);
      return bids;
    },
  });

  const rotationDegree = Math.floor(Math.random() * 7) - 3;
  const classes = clsx({
    "border transition rounded-sm w-80 p-5 bg-white flex gap-2 flex-col": true,
    "z-10 absolute shadow-lg left-1/2 top-1/2 transform": active,
  });
  const scale = active && !closed ? 1.4 : 1;
  const translate = active && !closed ? "-40%" : "0%";

  const style = {
    transform: `rotate(${rotationDegree}deg) scale(${scale}) translateX(${translate}) translateY(${translate})`,
  };

  const tvl = bids?.reduce((acc, bid) => acc + bid, 0);
  const maxbid = bids.length === 0 ? 0 : Math.max(...bids);

  const bgColors = {
    [SnakeStage.Open]: "bg-green-500",
    [SnakeStage.Closing]: "bg-yellow-500",
    [SnakeStage.Closed]: "bg-red-500",
  };

  return (
    <div style={style} className={classes}>
      <div className="rounded bg-neutral-200 h-40 relative">
        <Image
          src={imageSrc}
          fill={true}
          sizes="100% 100%"
          alt="snake image"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      <h2 className="font-bold text-neutral-800 text-xl">
        {snake.id.toUpperCase()}
      </h2>
      <div className="flex justify-between">
        <div>
          <div className="text-sm font-bold text-neutral-500">
            Total Value Locked
          </div>
          <p className="text-lg">{tvl.toLocaleString()}</p>
        </div>
        <div>
          <div
            className={`text-xs font-bold text-neutral-50 px-2 py-1 text-sm rounded ${
              bgColors[snake.stage]
            }`}
          >
            Stage {snake.stage}
          </div>
        </div>
      </div>
      <div>
        <div className="text-sm font-bold text-neutral-500">Highest Bid</div>
        <p className="text-lg">{maxbid.toLocaleString()}</p>
      </div>
    </div>
  );
}
