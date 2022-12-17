import { NFT, NFTDrop, SmartContract } from "@thirdweb-dev/sdk";
import create from "zustand";
import { persist } from "zustand/middleware";

type CartStoreState = {
    item: NFT | null;
    itemContractAddress: string | null;
    setItem: (payload: { item: NFT; itemContractAddress: string }) => void;
    resetCart: () => void;
};

export const useCartStore = create<CartStoreState>(
    persist(
        (set) => ({
            item: null,
            itemContractAddress: null,
            setItem: ({ item, itemContractAddress }) =>
                set({ item, itemContractAddress }),
            resetCart: () => set({ item: null, itemContractAddress: null }),
        }),
        {
            name: "cart",
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
