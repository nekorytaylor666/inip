import { ChainId } from "@thirdweb-dev/sdk";

export const desiredChainId = ChainId.Polygon;

export const chainRpcUrls = {
    [ChainId.Mumbai]: "https://mumbai.magic.io/rpc",
    [ChainId.Polygon]:
        "https://polygon-mainnet.g.alchemy.com/v2/c6ihPOtMZN5GxE2yTkKMJrIAMgkOmCJ-",
};
