import { useState, useEffect } from "react";
import { getDecimalFromLastHex } from "./";

function useSnakeImageSrc(snakeId: string) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    async function fetchHash() {
      const decimalHash = await getDecimalFromLastHex(snakeId);
      setImageSrc(`/snakes/00${decimalHash}.jpg`);
    }

    fetchHash();
  }, [snakeId]);

  return imageSrc;
}

export default useSnakeImageSrc;
