import React from "react";

import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NextPageWithLayout } from "./_app";
import { Navbar } from "@components/navbar/navbar";
import styles from "./page.module.css";
import { DREAMS_COME_TRUE_EDITION_ADDRESS } from "src/utils/const";
import { ItemImage } from "@components/item-image/item-image.component";
import Link from "next/link";

const HomePage: NextPageWithLayout = () => {
    const { contract } = useContract(DREAMS_COME_TRUE_EDITION_ADDRESS);
    const {
        data: items,
        isLoading: isItemsLoading,
        error: itemsError,
    } = useNFTs(contract as any);

    return (
        <>
            <div className="grid grid-cols-3 p-4 gap-4">
                {items?.map((item) => (
                    <Link href={"/dreams/" + item?.metadata.id}>
                        <div className=" p-3 bg-black">
                            <div className="h-[580px] w-full">
                                <ItemImage
                                    src={item.metadata.image}
                                    alt={"nft-cover"}
                                ></ItemImage>
                            </div>

                            <p className=" font-display text-5xl mt-4 truncate">
                                {item.metadata.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

HomePage.getLayout = (page) => (
    <>
        <div
            className={
                styles.pageContainer +
                "  divide-y divide-solid divide-gray-600 "
            }
        >
            <Navbar className="h-full" />
            <main className="bg-[#131313] h-full text-white">{page}</main>
        </div>
    </>
);

export default HomePage;
