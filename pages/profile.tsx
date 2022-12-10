import { DesktopNavbarComponent } from "@components/navbar/navbar";
import {
    useAddress,
    useContract,
    useDisconnect,
    useLogout,
    useNFTs,
    useOwnedNFTs,
} from "@thirdweb-dev/react";
import React from "react";
import { DREAMS_COME_TRUE_EDITION_ADDRESS } from "src/utils/const";
import styles from "./page.module.css";
import Wallet from "src/icon-components/Wallet";
import { DefaultLayout } from "@components/layouts/defaultLayout";
import { ItemImage } from "@components/item-image/item-image.component";
import { SkeletonGridComponent } from "@components/skeletons/skeleton-grid.component";
import Link from "next/link";
import { HorizontalDivider } from "@components/divider/horizontal-divider.component";
import { truncateString } from "src/utils/helpers";
import { useMagicStore } from "src/store/magic.store";
const Profile = () => {
    const walletAddress = useAddress();
    console.log(!!walletAddress);
    const { magic } = useMagicStore();

    const onLogout = () => {
        magic.connect.disconnect().then(() => {
            window.location.reload();
        });
    };
    const { contract } = useContract(DREAMS_COME_TRUE_EDITION_ADDRESS);
    const { data: dreams, isLoading: isDreamsLoading } = useOwnedNFTs(
        contract,
        walletAddress,
    );
    return (
        <div className="p-4 lg:p-8">
            <div className="p-8 lg:p-16 border rounded-2xl lg:rounded-full border-white flex justify-between items-center ">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 lg:w-12 lg:h-12"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                        />
                    </svg>
                    <p className="block lg:hidden font-display text-3xl lg:text-6xl mt-4 truncate max-w-xl">
                        {truncateString(walletAddress, 14)}
                    </p>{" "}
                    <p className="hidden lg:block font-display text-3xl lg:text-6xl mt-4 truncate max-w-xl">
                        {walletAddress}
                    </p>
                </div>
                <button
                    onClick={onLogout}
                    className=" h-80 w-80 border border-white rounded-full"
                >
                    Выйти
                </button>
            </div>
            <div className="pt-8">
                <h3 className="font-display text-4xl lg:text-6xl mb-8">
                    INIP: NFT-ТОВАРЫ
                </h3>
                <HorizontalDivider className="my-4"></HorizontalDivider>
                {isDreamsLoading && (
                    <SkeletonGridComponent quantity={3}></SkeletonGridComponent>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                    {dreams?.map((item) => (
                        <div className=" p-3 bg-black">
                            <div className="lg:h-[580px] h-64 w-full">
                                <ItemImage
                                    src={item.metadata.image}
                                    alt={"nft-cover"}
                                ></ItemImage>
                            </div>
                            <p className="font-display text-lg mt-4">
                                Кол-во: {item.quantityOwned} шт.
                            </p>
                            <p className=" font-display text-2xl lg:text-5xl mt-4 ">
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
