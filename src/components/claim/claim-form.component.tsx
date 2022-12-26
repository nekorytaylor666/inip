import { HorizontalDivider } from "@components/divider/horizontal-divider.component";
import Input from "@components/input/input.component";
import { ItemImage } from "@components/item-image/item-image.component";
import { DefaultLayout } from "@components/layouts/defaultLayout";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useClaimStore } from "src/store/claim.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, orderValidationSchema } from "./order.schema";

const ClaimFormPage = () => {
    const { itemToClaim, itemToClaimContractAddress } = useClaimStore();
    return (
        <div>
            <div className="flex items-center justify-center h-full">
                <div className=" container max-w-5xl">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 p-4 lg:p-8 gap-8">
                        <div className="w-full">
                            <h1 className=" font-display text-7xl lg:text-8xl">
                                Покупка NFT
                            </h1>
                            <p className="mt-4 text-base lg:text-lg w-full lg:w-2/3">
                                После подтверждения транзакции NFT будет
                                отправлен вам в кошелек
                            </p>
                            <HorizontalDivider className="my-8"></HorizontalDivider>

                            <ClaimForm></ClaimForm>
                        </div>
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

const ClaimForm = () => {
    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm<Order>({
        resolver: zodResolver(orderValidationSchema),
    });

    const onSubmit: SubmitHandler<Order> = (data) => {
        console.log(data);
    };
    //!TODO Refactor button styles and componentn
    const buttonStyles = {
        regular:
            "bg-brand-black transition-all duration-300 hover:bg-brand-orange w-full h-14 rounded-md",
        disabled: "bg-gray-600 w-full h-14 rounded-md cursor-not-allowed",
    };
    const isButtonDisabled = false;
    return (
        <form
            onSubmit={handleSubmit(
                (data) => console.log(data),
                (errors) => console.log(errors),
            )}
        >
            <div className="grid gap-6 mb-6 grid-cols-1">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            <div className="grid grid-cols-1 gap-6 mt-6">
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
                Submit
            </button>
        </form>
    );
};

ClaimFormPage.getLayout = DefaultLayout;

export default ClaimFormPage;
