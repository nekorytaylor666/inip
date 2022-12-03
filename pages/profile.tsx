import { Navbar } from "@components/navbar/navbar";
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import React from "react";
import { DREAMS_COME_TRUE_EDITION_ADDRESS } from "src/utils/const";
import styles from "./page.module.css";
import Wallet from "src/icon-components/Wallet";
import { DefaultLayout } from "@components/layouts/defaultLayout";
import { ItemImage } from "@components/item-image/item-image.component";
import { SkeletonGridComponent } from "@components/skeletons/skeleton-grid.component";
import Link from "next/link";
import { HorizontalDivider } from "@components/divider/horizontal-divider.component";
const Profile = () => {
    const walletAddress = useAddress();
    console.log(!!walletAddress);
    const { contract } = useContract(DREAMS_COME_TRUE_EDITION_ADDRESS);

    const { data: dreams, isLoading: isDreamsLoading } = useOwnedNFTs(
        contract,
        walletAddress,
    );
    return (
        <div className="p-8">
            {/* create full width container with address and log out button with white border and full border radius  */}
            <div className="p-16 border rounded-full border-white flex justify-between items-center ">
                <div>
                    <Wallet></Wallet>
                    <p className="font-display text-6xl mt-4">
                        {walletAddress}
                    </p>
                </div>
                {/* <button className=" h-80 w-80 border border-white rounded-full">
                    Выйти
                </button> */}
            </div>
            <div className="pt-8">
                <h3 className="font-display text-6xl mb-8">
                    INIP: Food packages
                </h3>
                <HorizontalDivider className="my-4"></HorizontalDivider>
                {isDreamsLoading && (
                    <SkeletonGridComponent quantity={3}></SkeletonGridComponent>
                )}
                <div className="grid grid-cols-3 gap-8">
                    {dreams?.map((item) => (
                        <div className=" p-3 bg-black">
                            <div className="h-[580px] w-full">
                                <ItemImage
                                    src={item.metadata.image}
                                    alt={"nft-cover"}
                                ></ItemImage>
                            </div>
                            <p className="font-display text-2xl mt-4">
                                Кол-во: {item.quantityOwned} шт.
                            </p>
                            <p className=" font-display text-5xl mt-4 truncate">
                                {item.metadata.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

Profile.getLayout = DefaultLayout;

export default Profile;
