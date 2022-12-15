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
import NFTItemPageComponent from "@components/NFTItemPage/nft-item.page";

const DreamItemPage: NextPageWithLayout = () => {
    return (
        <>
            <NFTItemPageComponent
                contractAddress={DREAMS_COME_TRUE_EDITION_ADDRESS}
            ></NFTItemPageComponent>
        </>
    );
};

DreamItemPage.getLayout = DefaultLayout;

export default DreamItemPage;
