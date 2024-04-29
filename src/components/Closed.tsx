import { useSnakeStore } from "@/store";
import { useEffect } from "react";
import useSnakeImageSrc from "@/types/useSnakeImage";
import { queryClient } from "@/app/provider";
import Image from "next/image";

export default function Closed() {
  const closed = useSnakeStore((state) => state.closed);
  const snakes = useSnakeStore((state) => state.snakes);
  const bids = useSnakeStore((state) => state.bids);
  const clearClosed = useSnakeStore((state) => state.clearClosed);
  const imageSrc = useSnakeImageSrc(closed);

  const thisBids = bids[closed].toSorted();
  const style = { transform: "translateX(-50%) translateY(-50%)" };

  useEffect(() => {
    setTimeout(() => {
      clearClosed();
      queryClient.invalidateQueries({ queryKey: ["snakes"] });
    }, 5000);
  }, [clearClosed]);

  return (
    <div
      className="border flex rounded p-10  gap-4 text-lg absolute z-50 bg-white transform shadow-lg left-1/2 top-1/2 transform"
      style={style}
    >
      <div className="rounded bg-neutral-200 w-80 h-60 relative">
        <Image
          src={imageSrc}
          fill={true}
          sizes="100% 100%"
          alt="snake image - closed"
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="text-2xl font-bold">
          Bidding finished on {snakes[closed]?.id}
        </div>
        <div className="text-lg w-2/3">
          Snake highest bid was{" "}
          <span className="font-bold">
            {(thisBids[thisBids.length - 1] ?? 0).toLocaleString()}
          </span>
        </div>
        <div className="text-lg w-2/3">
          Second highest bid was{" "}
          <span className="font-bold">
            {(thisBids[thisBids.length - 2] ?? 0).toLocaleString()}
          </span>
        </div>
        <div className="text-lg w-2/3">
          Congratulations to the lucky winner of snake id:{" "}
          <span className="font-bold">{closed}</span>
        </div>
      </div>
    </div>
  );
}
