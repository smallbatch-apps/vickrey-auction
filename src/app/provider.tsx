"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

import { watchWebsockets } from "@/store/websocket";

export default function Provider({ children }: { children: React.ReactNode }) {
  watchWebsockets();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
