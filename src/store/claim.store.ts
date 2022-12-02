import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import create from "zustand";

type CartStoreState = {
    itemToClaim: NFT | null;
    itemToClaimContract: SmartContract | null;
    setItemToClaim: (payload: {
        item: NFT;
        itemContract: SmartContract;
    }) => void;
    resetClaim: () => void;
};

export const useClaimStore = create<CartStoreState>((set) => ({
    itemToClaim: null,
    itemToClaimContract: null,
    setItemToClaim: ({ item, itemContract }) =>
        set({ itemToClaim: item, itemToClaimContract: itemContract }),
    resetClaim: () => set({ itemToClaim: null, itemToClaimContract: null }),
}));
