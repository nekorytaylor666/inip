import { HorizontalDivider } from "@components/divider/horizontal-divider.component";
import Input from "@components/input/input.component";
import { ItemImage } from "@components/item-image/item-image.component";
import { DefaultLayout } from "@components/layouts/defaultLayout";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useClaimStore } from "src/store/claim.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, orderValidationSchema } from "./order.schema";
import { firebaseFirestore } from "src/core/firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { NFT } from "@thirdweb-dev/sdk";
import {
    useBurnNFT,
    useBurnToken,
    useContract,
    useTransferNFT,
} from "@thirdweb-dev/react";
import SuccessComponent from "@components/success/success.component";
const ClaimFormPage = () => {
    const [showSuccess, setShowSuccess] = useState(true);
    const { itemToClaim, itemToClaimContractAddress } = useClaimStore();

    return (
        <div>
            <div className="flex items-center justify-center h-full">
                <div className=" container max-w-5xl">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 p-4 lg:p-8 gap-8">
                        <ClaimFormContainer></ClaimFormContainer>
                        <div className="">
                            <ItemImage
                                src={itemToClaim.metadata.image}
                                alt="nft"
                            ></ItemImage>
                            <p className="font-display text-2xl lg:text-4xl p-4 border border-gray-600 border-t-0 ">
                                {itemToClaim.metadata.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ClaimFormContainer = () => {
    const { itemToClaim, itemToClaimContractAddress } = useClaimStore();
    return (
        <div className="w-full">
            <h1 className=" font-display text-7xl lg:text-8xl">
                Обмен на товар
            </h1>

            <HorizontalDivider className="my-8"></HorizontalDivider>

            <ClaimForm
                item={itemToClaim}
                contractAddress={itemToClaimContractAddress}
            ></ClaimForm>
        </div>
    );
};

interface ClaimFormProps {
    item: NFT;
    contractAddress: string;
}

const ClaimForm: React.FC<ClaimFormProps> = (props) => {
    const { item, contractAddress } = props;
    const { contract } = useContract(contractAddress, "edition-drop");

    const {
        mutate: burnNft,
        isLoading: isBurning,
        error: burnError,
    } = useTransferNFT(contract);
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm<Order>({
        resolver: zodResolver(orderValidationSchema),
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit: SubmitHandler<Order> = async (data) => {
        setIsSubmitting(true);
        burnNft(
            {
                tokenId: item.metadata.id,
                amount: 1,
                to: "0x000000000000000000000000000000000000dEaD",
            },
            {
                onSuccess: async (receipt) => {
                    try {
                        // convert all bignumber to string from receipt
                        const receiptString = JSON.parse(
                            JSON.stringify(receipt),
                        );
                        toast.success("NFT успешно сожжено!");
                        await addDoc(collection(firebaseFirestore, "orders"), {
                            ...data,
                            ...receiptString,
                        });
                        toast.success("Заявка успешно отправлена");
                    } catch (error) {
                        console.log(error);
                        toast.error(
                            "Ошибка при отправке заявки, сохраните чек транзакции и отправьте его на почту",
                        );
                    }
                    setIsSubmitting(false);
                },
                onError: (error) => {
                    toast.error("Ошибка транзакции " + error);
                    setIsSubmitting(false);
                },
            },
        );
    };

    //!TODO Refactor button styles and componentn
    const buttonStyles = {
        regular:
            "bg-brand-black transition-all duration-300 hover:bg-brand-orange w-full h-14 rounded-md",
        disabled: "bg-gray-600 w-full h-14 rounded-md cursor-not-allowed",
    };
    const isButtonDisabled = isSubmitting;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mb-4 grid-cols-1">
                <Input
                    label="Полное имя"
                    register={register("fullname")}
                    errors={errors.fullname?.message}
                ></Input>
                <Input
                    label="Город"
                    register={register("city")}
                    errors={errors.city?.message}
                ></Input>
                <Input
                    label="Улица"
                    register={register("street")}
                    errors={errors.street?.message}
                ></Input>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Input
                    label="Подъезд"
                    register={register("entrance")}
                    errors={errors.entrance?.message}
                ></Input>
                <Input
                    label="Этаж"
                    register={register("floor")}
                    errors={errors.floor?.message}
                ></Input>
                <Input
                    label="Квартира"
                    register={register("apartment")}
                    errors={errors.apartment?.message}
                ></Input>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
                <Input
                    label="Номер телефона"
                    register={register("phone")}
                    errors={errors.phone?.message}
                ></Input>
                <Input
                    label="Комментарий к заказу"
                    register={register("comment")}
                ></Input>
            </div>
            <button
                type="submit"
                className={`mt-6 ${
                    isButtonDisabled
                        ? buttonStyles.disabled
                        : buttonStyles.regular
                }`}
            >
                {isButtonDisabled ? "Отправка..." : "Отправить"}
            </button>
        </form>
    );
};

export default ClaimFormPage;
