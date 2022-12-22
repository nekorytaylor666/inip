import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import create from "zustand";
import { persist } from "zustand/middleware";

type CartStoreState = {
    itemToClaim: NFT | null;
    itemToClaimContractAddress: string | null;
    setItemToClaim: (payload: {
        item: NFT;
        itemContractAddress: string;
    }) => void;
    resetClaim: () => void;
};

export const useClaimStore = create<CartStoreState>((set) => ({
    itemToClaim: null,
    itemToClaimContractAddress: null,
    setItemToClaim: ({ item, itemContractAddress }) =>
        set({
            itemToClaim: item,
            itemToClaimContractAddress: itemContractAddress,
        }),
    resetClaim: () =>
        set({
            itemToClaim: null,
            itemToClaimContractAddress: null,
        }),
}));
