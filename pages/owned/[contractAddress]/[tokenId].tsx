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
import { useClaimStore } from "src/store/claim.store";
import { useTranferStore } from "src/store/transfer.store";

const OwnedNFTItemPage: NextPageWithLayout = () => {
    const router = useRouter();
    const tokenId = router.query.tokenId as string;
    const contractAddress = router.query.contractAddress as string;
    console.log(contractAddress);
    return (
        <>
            <NFTItemPageComponent
                tokenId={tokenId}
                contractAddress={contractAddress}
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
    const { setItemToClaim } = useClaimStore();
    const { setItemToTranfer } = useTranferStore();
    const router = useRouter();

    const onClaim = ({
        item,
        contract,
    }: {
        item: NFT;
        contract: SmartContract<BaseContract>;
    }) => {
        setItemToClaim({ item, itemContractAddress: contract.getAddress() });
        router.push("/claim/");
    };
    const onTransfer = ({
        item,
        contract,
    }: {
        item: NFT;
        contract: SmartContract<BaseContract>;
    }) => {
        setItemToTranfer({ item, itemContractAddress: contract.getAddress() });
        router.push("/transfer/");
    };
    const buttonStyles = {
        regular:
            "bg-brand-black transition-all duration-300 hover:bg-brand-orange w-full h-14 rounded-md",
        disabled: "bg-gray-600 w-full h-14 rounded-md cursor-not-allowed",
    };

    const isButtonDisabled = !contract || !item;

    return (
        <div className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <button
                disabled={isButtonDisabled}
                onClick={() => onTransfer({ item, contract })}
                className={
                    isButtonDisabled
                        ? buttonStyles.disabled
                        : buttonStyles.regular
                }
            >
                Пожертвовать
            </button>
            <button
                disabled={true}
                onClick={() => onClaim({ item, contract })}
                className={buttonStyles.disabled}
            >
                Забрать самому
            </button>
        </div>
    );
};

OwnedNFTItemPage.getLayout = DefaultLayout;

export default OwnedNFTItemPage;
