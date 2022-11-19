import React from "react";
import "tailwindcss/tailwind.css";
import "@styles/global.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { Inter } from "@next/font/google";
import localFont from "@next/font/local";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

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
    const desiredChainId = ChainId.Mumbai;

    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <QueryClientProvider client={queryClient}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Hydrate state={pageProps.dehydratedState}>
                <ThirdwebProvider desiredChainId={desiredChainId}>
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
                </ThirdwebProvider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;
