import { Navbar } from "@components/navbar/navbar";
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import React from "react";
import { DREAMS_COME_TRUE_EDITION_ADDRESS } from "src/utils/const";
import styles from "./page.module.css";
import Wallet from "src/icon-components/Wallet";
const Profile = () => {
    const walletAddress = useAddress();
    console.log(!!walletAddress);
    const { contract } = useContract(DREAMS_COME_TRUE_EDITION_ADDRESS);
    const {
        data: ownedNFTs,
        isLoading,
        error,
    } = useOwnedNFTs(contract, walletAddress);
    return (
        <div>
            {/* create full width container with address and log out button with white border and full border radius  */}
            <div className="p-16 border-2 rounded-full border-white flex justify-between items-center">
                <div>
                    <Wallet></Wallet>
                    <p className="font-display text-6xl mt-4">
                        {walletAddress}
                    </p>
                </div>
                <button className=" h-80 w-80 border-2 border-white rounded-full">
                    Выйти
                </button>
            </div>
        </div>
    );
};

Profile.getLayout = (page) => (
    <>
        <div
            className={
                styles.pageContainer + "  divide-y divide-solid divide-gray-600"
            }
        >
            <Navbar className="h-full" />
            <main className="bg-black h-full text-white">{page}</main>
        </div>
    </>
);

export default Profile;
