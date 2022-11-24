import { ClaimCondition } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export const truncateString = (str: string, num: number) => {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    }
    return str;
};

export const revenueProgressFromClaimCondition = (
    claimCondition: ClaimCondition,
) => {
    const currentSupply = claimCondition?.currentMintSupply;
    const availalbesSupply = claimCondition?.maxClaimableSupply;
    const maxRevenueBN = claimCondition?.price.mul(
        ethers.BigNumber.from(availalbesSupply),
    );
    const currentRevenueBN = claimCondition?.price.mul(
        ethers.BigNumber.from(currentSupply),
    );
    const maxRevenue = parseFloat(
        ethers.utils.formatUnits(maxRevenueBN ?? "0", 6),
    );
    const currentRevenue = parseFloat(
        ethers.utils.formatUnits(currentRevenueBN ?? "0", 6),
    );
    const revenuePercent = (currentRevenue / maxRevenue) * 100;

    return {
        currentRevenue,
        maxRevenue,
        revenuePercent,
        currentSupply,
        availalbesSupply,
        maxRevenueBN,
        currentRevenueBN,
    };
};
