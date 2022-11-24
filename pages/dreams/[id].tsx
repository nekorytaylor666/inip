import { Footer } from "@components/footer";
import { DefaultLayout } from "@components/layouts/defaultLayout";
import { Navbar } from "@components/navbar/navbar";
import { useClaimConditions, useContract, useNFT } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import { DREAMS_COME_TRUE_EDITION_ADDRESS } from "src/utils/const";
import { revenueProgressFromClaimCondition } from "src/utils/helpers";
import styles from "../page.module.css";
import Image from "next/image";
import ProgressBar from "@components/progress/progress";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const DreamItemPage: NextPageWithLayout = () => {
    const router = useRouter();
    const tokenId = router.query.id as string;
    const { contract } = useContract(DREAMS_COME_TRUE_EDITION_ADDRESS);
    const {
        data: item,
        isLoading: isItemLoading,
        error: itemError,
    } = useNFT(contract as any, tokenId);
    const { data: claimConditions, isLoading } = useClaimConditions(
        contract as any,
        tokenId,
    );
    const initialClaimCondition = claimConditions?.[0];
    const revenueProgress =
        initialClaimCondition &&
        revenueProgressFromClaimCondition(initialClaimCondition);

    return (
        <div className="grid grid-cols-2 divide-x divide-gray-600 h-full">
            <div className="w-full p-4">
                <div className="flex justify-center items-center w-[100%] h-full bg-gray-300 rounded  dark:bg-gray-600 relative">
                    {!isItemLoading && (
                        <Image
                            className="rounded-sm"
                            src={item?.metadata?.image}
                            alt={"NFT"}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="top center"
                            placeholder="empty"
                        />
                    )}
                    <svg
                        className="w-12 h-12 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                    >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                </div>
            </div>
            <DreamDetails></DreamDetails>
        </div>
    );
};

const DreamDetails = () => {
    const router = useRouter();
    const tokenId = router.query.id as string;
    const { contract } = useContract(DREAMS_COME_TRUE_EDITION_ADDRESS);
    const {
        data: item,
        isLoading: isItemLoading,
        error: itemError,
    } = useNFT(contract as any, tokenId);
    const { data: claimConditions, isLoading: isClaimConditionsLoading } =
        useClaimConditions(contract as any, tokenId);
    const initialClaimCondition = claimConditions?.[0];
    const revenueProgress =
        initialClaimCondition &&
        revenueProgressFromClaimCondition(initialClaimCondition);
    const renderTitle = () => {
        if (isItemLoading) {
            return (
                <div role="status" className=" max-w-lg animate-pulse py-4">
                    <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }
        return (
            <h1 className="font-display text-8xl py-4">{item.metadata.name}</h1>
        );
    };

    const renderProgress = () => {
        if (isClaimConditionsLoading) {
            return (
                <div role="status" className="w-full animate-pulse py-4">
                    <div className="h-[40px] bg-gray-200 rounded-md dark:bg-gray-700 max-w-full"></div>
                </div>
            );
        }

        return (
            <div className="w-full">
                <ProgressBar
                    value={revenueProgress.currentRevenue}
                    max={revenueProgress.maxRevenue}
                ></ProgressBar>
                <div className="flex justify-between w-full items-center mt-2">
                    <span className="text-white-400 text-sm">
                        {revenueProgress.currentRevenue}
                    </span>
                    <span className="text-white-400 text-sm">
                        {revenueProgress.maxRevenue}
                    </span>
                </div>
            </div>
        );
    };

    const renderDescription = () => {
        if (isItemLoading) {
            return (
                <div role="status" className="w-full animate-pulse py-4">
                    <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }

        return (
            <p className="text-lg text-gray-300">{item.metadata.description}</p>
        );
    };
    return (
        <ScrollArea.Root>
            <ScrollArea.Viewport className="h-[90vh]">
                <div className="p-10">
                    <div className=" min-h-[250px]">{renderTitle()}</div>
                    <div className="pt-4">
                        <p className="font-display text-4xl">Количество</p>
                        <div className="w-full border-b border-gray-600 my-4"></div>
                        {renderProgress()}
                    </div>
                    <div className="pt-4">
                        <p className="font-display text-4xl">Описание</p>
                        <div className="w-full border-b border-gray-600 my-4"></div>
                        {renderDescription()}
                    </div>
                </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation="horizontal">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>

            <ScrollArea.Corner />
        </ScrollArea.Root>
    );
};

DreamItemPage.getLayout = (page) => (
    <>
        <div
            className={
                styles.pageContainer + "  divide-y divide-solid divide-gray-600"
            }
        >
            <Navbar className="h-full" />
            <main className="bg-black h-full text-white">{page}</main>
        </div>
    </>
);

export default DreamItemPage;
