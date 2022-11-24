import { ConnectExtension } from "@magic-ext/connect";
import { ChainId } from "@thirdweb-dev/react";
import { MagicConnector } from "@thirdweb-dev/react/evm/connectors/magic";
import { Magic } from "magic-sdk";
console.log(process.env.NEXT_PUBLIC_MAGIC_LINK_API_KEY);
export const magicLinkWalletConnector = new MagicConnector({
    options: {
        // Replace this with your own magic link api key
        apiKey: "pk_live_081CDC04F33BDDCC" as string,
        rpcUrls: {
            [ChainId.Mumbai]: "https://mumbai.magic.io/rpc",
            [ChainId.Polygon]:
                "https://polygon-mainnet.g.alchemy.com/v2/c6ihPOtMZN5GxE2yTkKMJrIAMgkOmCJ-",
        },
    },
});
