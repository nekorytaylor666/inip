import React, { useState } from "react";
import {
    ChainId,
    useBurnNFT,
    useClaimConditions,
    useClaimNFT,
} from "@thirdweb-dev/react";
import { NextPageWithLayout } from "./_app";
import { DesktopNavbarComponent } from "@components/navbar/navbar";
import styles from "./page.module.css";
import { useCartStore } from "src/store/cart.store";
import toast from "react-hot-toast";
import { CheckoutForm } from "@components/ClaimPage/claim-form.component";
import { DefaultLayout } from "@components/layouts/defaultLayout";
import { ItemImage } from "@components/item-image/item-image.component";
import { HorizontalDivider } from "@components/divider/horizontal-divider.component";
import { useClaimStore } from "src/store/claim.store";
import { firebaseFirestore } from "src/core/firebase";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";

const ClaimPage: NextPageWithLayout = () => {
    const { itemToClaim, itemToClaimContract } = useClaimStore();
    if (!itemToClaim) {
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
            item={itemToClaim}
            contract={itemToClaimContract}
        ></ClaimFormContainer>
    );
};

interface ClaimFormContainerProps {
    item: NFT;
    contract: SmartContract<BaseContract>;
}

const ClaimFormContainer: React.FC<ClaimFormContainerProps> = (props) => {
    const { item, contract } = props;
    const [isClaimLoading, setIsClaimLoading] = useState(false);
    return (
        <>
            <div className="flex items-center justify-center h-full">
                <div className=" container max-w-5xl">
                    <div className="w-full flex gap-8">
                        <div className="w-full">
                            <h1 className=" font-display text-8xl">
                                Покупка NFT
                            </h1>
                            <p className="mt-4 text-lg w-2/3">
                                После подтверждения транзакции NFT будет
                                отправлен вам в кошелек
                            </p>
                            <HorizontalDivider className="my-8"></HorizontalDivider>
                            <HorizontalDivider className="my-8"></HorizontalDivider>

                            <button
                                disabled={isClaimLoading}
                                className={` bg-brand-black w-full h-14 rounded-md ${
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
        </>
    );
};

ClaimPage.getLayout = DefaultLayout;

export default ClaimPage;
