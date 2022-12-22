import { DefaultLayout } from "@components/layouts/defaultLayout";
import { useClaimConditions, useContract, useNFT } from "@thirdweb-dev/react";
import router, { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React from "react";
import { DREAMS_COME_TRUE_EDITION_ADDRESS } from "src/utils/const";
import { revenueProgressFromClaimCondition } from "src/utils/helpers";
import ProgressBar from "@components/progress/progress";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { ItemImage } from "@components/item-image/item-image.component";
import { useCartStore } from "src/store/cart.store";
import { HorizontalDivider } from "@components/divider/horizontal-divider.component";
import NFTItemPageComponent from "@components/NFTItemPage/nft-item.page";
import { NFT, SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";

const DreamItemPage: NextPageWithLayout = () => {
    const router = useRouter();
    const tokenId = router.query.id as string;
    return (
        <>
            <NFTItemPageComponent
                tokenId={tokenId}
                contractAddress={DREAMS_COME_TRUE_EDITION_ADDRESS}
                itemActions={(props) => (
                    <ItemPageActions {...props}></ItemPageActions>
                )}
            ></NFTItemPageComponent>
        </>
    );
};

interface ItemPageActionsProps {
    item: NFT;
    contract: SmartContract<BaseContract>;
}

const ItemPageActions: React.FC<ItemPageActionsProps> = (props) => {
    const { item, contract } = props;
    const { setItem } = useCartStore();
    const router = useRouter();

    const onCheckout = ({
        item,
        contract,
    }: {
        item: NFT;
        contract: SmartContract<BaseContract>;
    }) => {
        setItem({ item, itemContractAddress: contract.getAddress() });
        router.push("/checkout/");
    };

    return (
        <div className="pt-4">
            <button
                onClick={() => onCheckout({ item, contract })}
                className={`bg-brand-black w-full h-14 rounded-md`}
            >
                Купить
            </button>
        </div>
    );
};

DreamItemPage.getLayout = DefaultLayout;

export default DreamItemPage;
