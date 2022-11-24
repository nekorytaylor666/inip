import React from "react";
import "tailwindcss/tailwind.css";
import "@styles/global.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import {
    ThirdwebProvider,
    ChainId,
    ThirdwebSDKProvider,
} from "@thirdweb-dev/react";
import { Inter } from "@next/font/google";
import localFont from "@next/font/local";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { magicLinkWalletConnector } from "src/utils/magiclinkConnector";
import { chainRpcUrls, desiredChainId } from "src/utils/chainRpc";
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import Web3 from "web3";
import { ethers } from "ethers";
import { MagicConnect, useMagicStore } from "src/store/magic.store";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
    P,
    IP
> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-inter",
});
const badRussian = localFont({
    src: "../public/font/Bad-Russian_Regular.otf",
    weight: "400",
    style: "normal",
    variable: "--font-bad-russian",
});

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    const queryClient = new QueryClient();
    const getLayout = Component.getLayout ?? ((page) => page);
    // create use effect hook that will set state to custom magic provider after initializing magic instance
    const {
        setMagicProvider,
        setMagic,
        magicProvider,
        magicSigner,
        setMagicSigner,
    } = useMagicStore();

    React.useEffect(() => {
        const initMagic = async () => {
            const magic = new Magic("pk_live_46C530D5CF9FA19B", {
                extensions: {
                    connect: new ConnectExtension(),
                },
                network: {
                    rpcUrl: chainRpcUrls[desiredChainId],
                    chainId: desiredChainId,
                },
            }) as MagicConnect;

            setMagic(magic);
            const provider = new ethers.providers.Web3Provider(
                magic.rpcProvider,
            );

            //set magic provider
            setMagicProvider(provider);
            const signer = provider.getSigner();
            setMagicSigner(signer);
        };
        initMagic();
    }, []);

    // default signer
    return (
        <QueryClientProvider client={queryClient}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Hydrate state={pageProps.dehydratedState}>
                <ThirdwebSDKProvider
                    desiredChainId={ChainId.Polygon}
                    provider={magicProvider}
                    signer={magicSigner}
                >
                    <main>
                        <style jsx global>
                            {`
                                :root {
                                    --font-inter: ${inter.style.fontFamily};
                                    --font-bad-russian: ${badRussian.style
                                        .fontFamily};
                                }
                            `}
                        </style>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        {getLayout(<Component {...pageProps} />)}
                    </main>
                </ThirdwebSDKProvider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
