import { DefaultLayout } from "@components/layouts/defaultLayout";
import { useClaimConditions, useContract, useNFT } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import { DREAMS_COME_TRUE_EDITION_ADDRESS } from "src/utils/const";
import { revenueProgressFromClaimCondition } from "src/utils/helpers";
import ProgressBar from "@components/progress/progress";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ItemImage } from "@components/item-image/item-image.component";
import { useCartStore } from "src/store/cart.store";
import { HorizontalDivider } from "@components/divider/horizontal-divider.component";

const DreamItemPage: NextPageWithLayout = () => {
    const router = useRouter();
    const tokenId = router.query.id as string;
    const { contract } = useContract(DREAMS_COME_TRUE_EDITION_ADDRESS);
    const { data: item } = useNFT(contract as any, tokenId);
    const { setItem } = useCartStore();

    const onClaim = () => {
        setItem({ item, itemContract: contract });
        router.push("/claim/");
    };
    return (
        <div className="grid grid-cols-2 divide-x divide-gray-600 h-full">
            <div className="w-full p-4 h-full flex flex-col">
                <ItemImage
                    src={item?.metadata.image}
                    alt="image_cover"
                ></ItemImage>
                <div className="pt-4">
                    <button
                        onClick={() => onClaim()}
                        className="border border-white w-full h-20 text-2xl"
                    >
                        Купить
                    </button>
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
    const { data: item, isLoading: isItemLoading } = useNFT(
        contract as any,
        tokenId,
    );
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
                        <HorizontalDivider className="my-4"></HorizontalDivider>
                        {renderProgress()}
                    </div>
                    <div className="pt-4">
                        <p className="font-display text-4xl">Описание</p>
                        <HorizontalDivider className="my-4"></HorizontalDivider>
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

DreamItemPage.getLayout = DefaultLayout;

export default DreamItemPage;
