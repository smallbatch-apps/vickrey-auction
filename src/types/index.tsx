export type Snake = {
  id: string;
  stage: SnakeStage;
  bid: number;
};

export enum SnakeStage {
  Open = 1,
  Closing,
  Closed,
}

export type Bids = Record<string, number[]>;

export async function getDecimalFromLastHex(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const lastHex = hashHex.slice(-1);
  const decimalValue = parseInt(lastHex, 16) + 1;

  if (decimalValue < 10) {
    return "0" + decimalValue;
  }
  return decimalValue.toString();
}
