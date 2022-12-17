import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import create from "zustand";
import { persist } from "zustand/middleware";

type CartStoreState = {
    itemToClaim: NFT | null;
    itemToClaimContract: SmartContract | null;
    setItemToClaim: (payload: {
        item: NFT;
        itemContract: SmartContract;
    }) => void;
    resetClaim: () => void;
};

export const useClaimStore = create<CartStoreState>(
    persist(
        (set) => ({
            itemToClaim: null,
            itemToClaimContract: null,
            setItemToClaim: ({ item, itemContract }) =>
                set({ itemToClaim: item, itemToClaimContract: itemContract }),
            resetClaim: () =>
                set({ itemToClaim: null, itemToClaimContract: null }),
        }),
        {
            name: "claim",
            getStorage: () => ({
                // Returning a promise from getItem is necessary to avoid issues with hydration
                getItem: async (name: string) => localStorage.getItem(name),
                setItem: (name: string, value: string) =>
                    localStorage.setItem(name, value),
                removeItem: (name: string) => localStorage.removeItem(name),
            }),
        },
    ),
);
