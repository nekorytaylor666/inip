import { HorizontalDivider } from "@components/divider/horizontal-divider.component";
import { ItemImage } from "@components/item-image/item-image.component";
import { ClaimCondition, NFT } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { CRYPTO_ICONS, AvailableCoins } from "src/utils/crypto-icons";

interface ClaimFormProps {
    isClaimLoading: boolean;
    onClaim: (quantity: number) => Promise<void>;
    isClaimConditionsLoading: boolean;
    claimCondition: ClaimCondition;
    item: NFT;
}

export const CheckoutForm = (props: ClaimFormProps): JSX.Element => {
    const {
        item,
        isClaimLoading,
        onClaim,
        isClaimConditionsLoading,
        claimCondition,
    } = props;
    const currencyIcon =
        !isClaimConditionsLoading &&
        CRYPTO_ICONS[claimCondition.currencyMetadata.symbol as AvailableCoins];

    const { register, handleSubmit, control } = useForm();
    const quantity = useWatch({
        control,
        name: "quantity",
        defaultValue: "1",
    });

    const onSubmitClaimForm = handleSubmit(async (values) => {
        await onClaim(Number.parseInt(values.quantity));
    });

    const renderPrice = () => {
        if (isClaimConditionsLoading) {
            return <div className="animate-pulse">Loading...</div>;
        }

        return (
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <img
                        className="h-12 w-12 lg:w-16 lg:h-16"
                        src={currencyIcon}
                        alt="currency"
                    />
                    <span className=" text-base w-1/3 lg-w-full lg:text-2xl">
                        Цена покупки
                    </span>
                </div>
                <span className="text-4xl lg:text-6xl  font-display uppercase">
                    {quantity &&
                        ethers.utils.formatUnits(
                            claimCondition.price.mul(
                                ethers.BigNumber.from(quantity),
                            ),
                            claimCondition.currencyMetadata.decimals,
                        )}
                    <span className="text-xl lg:text-4xl ml-4">
                        {claimCondition.currencyMetadata.symbol}
                    </span>
                </span>
            </div>
        );
    };
    return (
        <div className="flex  items-center justify-center h-full">
            <div className=" container max-w-5xl">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 p-4 lg:p-8 gap-8">
                    <div className="w-full">
                        <h1 className=" font-display text-7xl lg:text-8xl">
                            Покупка NFT
                        </h1>
                        <p className="mt-4 text-base lg:text-lg w-2/3">
                            После подтверждения транзакции NFT будет отправлен
                            вам в кошелек
                        </p>
                        <HorizontalDivider className="my-8"></HorizontalDivider>
                        {renderPrice()}
                        <HorizontalDivider className="my-8"></HorizontalDivider>
                        <form onSubmit={onSubmitClaimForm}>
                            <div className="flex items-center w-full gap-4">
                                <input
                                    className={`w-1/3 h-14 rounded-md bg-[#1A1A1A] px-4 ${
                                        isClaimLoading
                                            ? " opacity-50 animate-pulse cursor-not-allowed "
                                            : ""
                                    }`}
                                    type="number"
                                    disabled={isClaimLoading}
                                    placeholder="Amount of items"
                                    min={1}
                                    max={claimCondition?.availableSupply}
                                    {...register("quantity", { value: "1" })}
                                />
                                <button
                                    disabled={isClaimLoading}
                                    onClick={() => onClaim(quantity)}
                                    className={` bg-[#1A1A1A] w-full h-14 rounded-md ${
                                        isClaimLoading
                                            ? " opacity-50 animate-pulse cursor-not-allowed "
                                            : ""
                                    }`}
                                >
                                    {isClaimLoading
                                        ? "Загрузка... "
                                        : "Продолжить"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="">
                        <div className="w-full h-[500px]">
                            <ItemImage
                                src={item.metadata.image}
                                alt="nft"
                            ></ItemImage>
                        </div>
                        <p className="font-display text-4xl p-4 border border-gray-600 border-t-0 ">
                            {item.metadata.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
