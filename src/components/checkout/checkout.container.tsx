import { CheckoutForm } from "@components/checkout/checkout-form.component";
import {
    useContract,
    useClaimConditions,
    useClaimNFT,
} from "@thirdweb-dev/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useCartStore } from "src/store/cart.store";

const CheckoutFormContainer = () => {
    const { item, itemContractAddress } = useCartStore();
    const { contract: itemContract } = useContract(itemContractAddress);
    const { data: claimConditions, isLoading: isClaimConditionsLoading } =
        useClaimConditions(itemContract, item.metadata.id);

    const lastClaimCondition = claimConditions?.[claimConditions.length - 1];

    const { data: coinMarketData } = useQuery(["crypto-rates"], async () => {
        const res = await axios.get(
            "https://api.coingecko.com/api/v3/coins/matic-network?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false",
        );
        return res.data.market_data;
    });

    const {
        mutateAsync: claim,
        isLoading: isClaimLoading,
        error,
    } = useClaimNFT(itemContract);

    const onClaim = async (quantity: number) => {
        if (!lastClaimCondition) {
            return;
        }
        if (
            Number.parseInt(lastClaimCondition.availableSupply ?? "1") <
            quantity
        ) {
            toast("Too many items");
        }
        try {
            await claim(
                { quantity, tokenId: item.metadata.id },
                {
                    onSuccess(): void {
                        toast("Success");
                    },
                },
            );
        } catch (e: any) {
            toast("Недостаточно средств! Пополните кошелек.");
        }
    };
    if (!item) {
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
        <>
            <CheckoutForm
                coinMarketData={coinMarketData}
                claimCondition={lastClaimCondition}
                onClaim={onClaim}
                isClaimLoading={isClaimLoading}
                isClaimConditionsLoading={isClaimConditionsLoading}
                item={item}
            ></CheckoutForm>
        </>
    );
};

export default CheckoutFormContainer;
