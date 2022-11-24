import { ConnectExtension } from "@magic-ext/connect";
import { ethers } from "ethers";
import { Magic } from "magic-sdk";
import create from "zustand";

export type MagicConnect = Magic<{
    connect: ConnectExtension;
}>;
// declare type for the magic store
type MagicStoreState = {
    magic: MagicConnect | null;
    setMagic: (magic: MagicConnect) => void;
    magicProvider: ethers.providers.Web3Provider | null;
    magicSigner: ethers.providers.JsonRpcSigner | null;
    setMagicProvider: (provider: ethers.providers.Web3Provider) => void;
    setMagicSigner: (signer: ethers.providers.JsonRpcSigner) => void;
};

export const useMagicStore = create<MagicStoreState>((set) => ({
    magic: null,
    magicProvider: null,
    magicSigner: null,
    setMagic: (magic) => set({ magic }),
    setMagicProvider: (magicProvider) => set({ magicProvider }),
    setMagicSigner: (magicSigner) => set({ magicSigner }),
}));
