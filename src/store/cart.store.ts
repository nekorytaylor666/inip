import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import create from "zustand";

type CartStoreState = {
    item: NFT | null;
    itemContract: SmartContract | null;
    setItem: (payload: { item: NFT; itemContract: SmartContract }) => void;
    resetCart: () => void;
};

export const useCartStore = create<CartStoreState>((set) => ({
    item: null,
    itemContract: null,
    setItem: ({ item, itemContract }) => set({ item, itemContract }),
    resetCart: () => set({ item: null, itemContract: null }),
}));
