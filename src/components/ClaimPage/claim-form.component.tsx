import { HorizontalDivider } from "@components/divider/horizontal-divider.component";
import { ItemImage } from "@components/item-image/item-image.component";
import { ClaimCondition, NFT } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { useState } from "react";
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
    const [quantity, setQuantity] = useState(1);
    const renderPrice = () => {
        if (isClaimConditionsLoading) {
            return <div className="animate-pulse">Loading...</div>;
        }

        return (
            <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <img
                        className=" w-16 h-16"
                        src={currencyIcon}
                        alt="currency"
                    />
                    <span className=" text-2xl">Цена покупки</span>
                </div>
                <span className="text-6xl font-display uppercase">
                    {quantity &&
                        ethers.utils.formatUnits(
                            claimCondition.price.mul(
                                ethers.BigNumber.from(quantity),
                            ),
                            claimCondition.currencyMetadata.decimals,
                        )}
                    <span className="ml-4">
                        {claimCondition.currencyMetadata.symbol}
                    </span>
                </span>
            </div>
        );
    };
    return (
        <div className="flex items-center justify-center h-full">
            <div className=" container max-w-5xl">
                <div className="w-full flex gap-8">
                    <div className="w-full">
                        <h1 className=" font-display text-8xl">Покупка NFT</h1>
                        <p className="mt-4 text-lg w-2/3">
                            После подтверждения транзакции NFT будет отправлен
                            вам в кошелек
                        </p>
                        <HorizontalDivider className="my-8"></HorizontalDivider>
                        {renderPrice()}
                        <HorizontalDivider className="my-8"></HorizontalDivider>

                        <button
                            disabled={isClaimLoading}
                            onClick={() => onClaim(quantity)}
                            className={` bg-[#1A1A1A] w-full h-14 rounded-md ${
                                isClaimLoading
                                    ? " opacity-50 animate-pulse cursor-not-allowed "
                                    : ""
                            }`}
                        >
                            {isClaimLoading ? "Загрузка... " : "Продолжить"}
                        </button>
                    </div>
                    <div className="">
                        <div className=" w-[450px] h-[500px]">
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
