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

interface NFTItemPageProps {
    contractAddress: string;
}

const NFTItemPageComponent: React.FC<NFTItemPageProps> = (props) => {
    const { contractAddress } = props;
    const router = useRouter();
    const tokenId = router.query.id as string;
    const { contract } = useContract(contractAddress);
    const { data: item, isLoading: isItemLoading } = useNFT(
        contract as any,
        tokenId,
    );
    const { setItem } = useCartStore();

    const onClaim = () => {
        setItem({ item, itemContract: contract });
        router.push("/checkout/");
    };
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-gray-600 h-full">
            <div className="w-full pt-4 p-4 lg:px-8  flex flex-col">
                <ItemImage
                    src={item?.metadata.image}
                    alt="image_cover"
                ></ItemImage>
                <div className="pt-4">
                    <button
                        disabled={isItemLoading}
                        onClick={() => onClaim()}
                        className={`bg-brand-black w-full h-14 rounded-md`}
                    >
                        Купить
                    </button>
                </div>
            </div>
            <ItemDetails contractAddress={contractAddress}></ItemDetails>
        </div>
    );
};

interface ItemDetailsProps {
    contractAddress: string;
}

const ItemDetails: React.FC<ItemDetailsProps> = (props) => {
    const { contractAddress } = props;
    const router = useRouter();
    const tokenId = router.query.id as string;
    const { contract } = useContract(contractAddress);
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
            <h1 className="font-display text-4xl lg:text-8xl py-4">
                {item.metadata.name}
            </h1>
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
                    value={revenueProgress?.revenuePercent}
                    max={100}
                ></ProgressBar>
                <div className="flex justify-between w-full items-center mt-2">
                    <span className="text-white-400 text-sm">
                        {revenueProgress.currentSupply}
                    </span>
                    <span className="text-white-400 text-sm">
                        {revenueProgress.availalbesSupply}
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
        <>
            <div className="hidden lg:block">
                <ScrollArea.Root>
                    <ScrollArea.Viewport className="h-[90vh]">
                        <div className="p-10">
                            <div className=" min-h-[250px]">
                                {renderTitle()}
                            </div>
                            <div className="pt-4">
                                <p className="font-display text-4xl">
                                    Количество
                                </p>
                                <HorizontalDivider className="my-4"></HorizontalDivider>
                                {renderProgress()}
                            </div>
                            <div className="pt-4">
                                <p className="font-display text-4xl">
                                    Описание
                                </p>
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
            </div>
            <div className="block lg:hidden">
                <div className="p-4 lg:p-10">
                    <div className=" lg:min-h-[250px]">{renderTitle()}</div>
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
            </div>
        </>
    );
};

NFTItemPageComponent;

export default NFTItemPageComponent;
