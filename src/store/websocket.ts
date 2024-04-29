import { useSnakeStore } from "@/store";
import { SnakeStage, Snake } from "@/types";
import { queryClient } from "@/app/provider";

export function watchWebsockets() {
  const url = `${process.env.NEXT_PUBLIC_API_WS_URL}/updates`;
  const updatesWS = new WebSocket(url);

  updatesWS.addEventListener("message", (event) => {
    const state = useSnakeStore.getState();
    const eventData = JSON.parse(event.data) as Snake;
    const snake = state.snakes[eventData.id];
    if (!snake) {
      queryClient.invalidateQueries({ queryKey: ["snakes"] });
    } else {
      if (eventData.stage === SnakeStage.Open) {
        queryClient.invalidateQueries({ queryKey: ["bids", eventData.id] });
      } else if (
        snake.stage === eventData.stage &&
        eventData.stage === SnakeStage.Closing
      ) {
        console.log("THIS MIGHT NEED TO BE DELETED");
        console.log(eventData);
        console.log(useSnakeStore.getState().bids[eventData.id]);
      }

      if (snake.stage !== eventData.stage) {
        if (eventData.stage === SnakeStage.Closed) {
          useSnakeStore.setState({ ...state, closed: eventData.id });
        } else {
        }
        queryClient.invalidateQueries({ queryKey: ["snakes"] });
      } else {
        useSnakeStore.setState({ ...state, inVogue: eventData.id });
      }
    }
  });
}
