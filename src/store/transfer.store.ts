import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import create from "zustand";
import { persist } from "zustand/middleware";

type TransferStoreState = {
    itemToTransfer: NFT | null;
    itemContractAddress: string | null;
    setItemToTranfer: (payload: {
        item: NFT;
        itemContractAddress: string;
    }) => void;
    resetTransfer: () => void;
};

export const useTranferStore = create<TransferStoreState>((set) => ({
    itemToTransfer: null,
    itemContractAddress: null,
    setItemToTranfer: ({ item, itemContractAddress }) =>
        set({
            itemToTransfer: item,
            itemContractAddress: itemContractAddress,
        }),
    resetTransfer: () =>
        set({
            itemToTransfer: null,
            itemContractAddress: null,
        }),
}));
