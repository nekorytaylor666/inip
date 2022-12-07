import React from "react";

import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NextPageWithLayout } from "./_app";
import { DREAMS_COME_TRUE_EDITION_ADDRESS } from "src/utils/const";
import { ItemImage } from "@components/item-image/item-image.component";
import Link from "next/link";
import { DefaultLayout } from "@components/layouts/defaultLayout";
import { SkeletonGridComponent } from "@components/skeletons/skeleton-grid.component";

const HomePage: NextPageWithLayout = () => {
    const { contract } = useContract(DREAMS_COME_TRUE_EDITION_ADDRESS);
    const {
        data: items,
        isLoading: isItemsLoading,
        error: itemsError,
    } = useNFTs(contract as any);

    return (
        <div className=" p-4 lg:p-8 ">
            {isItemsLoading && <SkeletonGridComponent></SkeletonGridComponent>}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3 lg:gap-8">
                {items?.map((item) => (
                    <Link href={"/nft/" + item?.metadata.id}>
                        <div className=" p-3 bg-black">
                            <div className=" h-72 lg:h-[580px] w-full">
                                <ItemImage
                                    src={item.metadata.image}
                                    alt={"nft-cover"}
                                ></ItemImage>
                            </div>

                            <p className=" font-display text-2xl mt-2 lg:text-5xl lg:mt-4 ">
                                {item.metadata.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

HomePage.getLayout = DefaultLayout;

export default HomePage;
