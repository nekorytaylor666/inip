import React, { useState } from "react";
import {
    NFTContract,
    useAirdropNFT,
    useContract,
    useNFT,
    useTransferNFT,
} from "@thirdweb-dev/react";
import { NextPageWithLayout } from "./_app";
import toast from "react-hot-toast";
import { DefaultLayout } from "@components/layouts/defaultLayout";
import { ItemImage } from "@components/item-image/item-image.component";
import { HorizontalDivider } from "@components/divider/horizontal-divider.component";
import { useClaimStore } from "src/store/claim.store";
import { Edition, EditionDrop, NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";
import { useRouter } from "next/router";
import { useTranferStore } from "src/store/transfer.store";
import { useForm } from "react-hook-form";

const TranferPage: NextPageWithLayout = () => {
    const { itemToTransfer, itemContractAddress } = useTranferStore();

    const { contract, isLoading, error } = useContract(
        itemContractAddress,
        "edition-drop",
    );
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className=" container max-w-5xl">
                    <div className="w-full flex gap-4">
                        <h1 className=" font-display text-6xl text-center">
                            Loading...
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className=" container max-w-5xl">
                    <div className="w-full flex gap-4">
                        <h1 className=" font-display text-6xl text-center">
                            {JSON.stringify(error)}
                        </h1>
                    </div>
                </div>
            </div>
        );
    }

    if (!itemToTransfer) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className=" container max-w-5xl">
                    <div className="w-full flex gap-4">
                        <h1 className=" font-display text-6xl text-center">
                            No Item
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <ClaimFormContainer
            item={itemToTransfer}
            contract={contract}
        ></ClaimFormContainer>
    );
};

interface ClaimFormContainerProps {
    item: NFT;
    contract: EditionDrop;
}

const ClaimFormContainer: React.FC<ClaimFormContainerProps> = (props) => {
    const { item, contract } = props;
    const {
        mutate: airdropNFT,
        error,
        isLoading,
    } = useAirdropNFT(contract as any);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        onTransfer(data.wallet);
    };

    if (error) {
        console.log(error);
    }
    if (!contract) {
        return <div>no contract</div>;
    }
    const onTransfer = async (address: string) => {
        airdropNFT(
            {
                addresses: [{ address, quantity: 1 }],
                tokenId: item.metadata.id,
            },
            {
                onSuccess: () => {
                    toast.success("NFT успешно передан");
                },
                onError: (error) => {
                    toast.error("Ошибка при передаче NFT");
                },
            },
        );
    };
    const buttonStyles = {
        regular:
            "bg-brand-black transition-all duration-300 hover:bg-brand-orange w-full h-14 rounded-md",
        disabled: "bg-gray-600 w-full h-14 rounded-md cursor-not-allowed",
    };
    return (
        <>
            <div className="flex items-center justify-center h-full ">
                <div className=" container max-w-5xl">
                    <div className="w-full flex gap-8">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full"
                        >
                            <h1 className=" font-display text-8xl">
                                Передача NFT
                            </h1>
                            <p className="mt-4 text-lg w-2/3">
                                Передавая NFT, вы отдаете и товар, прикрепленный
                                к NFT
                            </p>
                            <HorizontalDivider className="my-8"></HorizontalDivider>
                            <div className="mb-6">
                                <label
                                    htmlFor="default-input"
                                    className="block mb-2 text-lg font-medium text-white"
                                >
                                    Номер кошелька
                                </label>
                                <input
                                    {...register("wallet", { required: true })}
                                    type="text"
                                    id="default-input"
                                    placeholder="0x0000000000000000000000000000000000000000"
                                    className="bg-brand-black border-gray-500 text-base rounded-md focus:ring-brand-orange focus:border-brand-orange block w-full p-4  placeholder-gray-500 text-white "
                                />
                                {errors.wallet && (
                                    <p className="text-red-500">
                                        Введите номер кошелька
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={
                                    isLoading
                                        ? buttonStyles.disabled
                                        : buttonStyles.regular
                                }
                            >
                                {isLoading ? "Загрузка... " : "Продолжить"}
                            </button>
                        </form>
                        <div className="">
                            <ItemImage
                                src={item.metadata.image}
                                alt="nft"
                            ></ItemImage>
                            <p className="font-display text-4xl p-4 border border-gray-600 border-t-0 ">
                                {item.metadata.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

TranferPage.getLayout = DefaultLayout;

export default TranferPage;
