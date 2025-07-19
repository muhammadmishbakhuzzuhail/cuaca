"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ListStoreProvider } from "@/context/dropdown-store";
import { MainStoreProvider } from "@/context/main-store";
import { ToggleContextProvider } from "@/context/toggle-context";

export function Providers({ children }: { children: React.ReactNode }) {
   const [queryClient] = useState(() => new QueryClient());

   return (
      <QueryClientProvider client={queryClient}>
         <ToggleContextProvider>
            <MainStoreProvider>
               <ListStoreProvider>{children}</ListStoreProvider>
            </MainStoreProvider>
         </ToggleContextProvider>
      </QueryClientProvider>
   );
}
