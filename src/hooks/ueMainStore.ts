import { useMainStoreContext } from "./useMainStoreContext";

export const useMainStore = () => {
   const mainDesaId = useMainStoreContext((state) => state.mainDesaId);
   const setMainDesaId = useMainStoreContext((state) => state.setMainDesaId);

   return {
      mainDesaId,
      setMainDesaId,
   };
};
