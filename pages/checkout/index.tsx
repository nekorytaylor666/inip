import React from "react";
import {
    useClaimConditions,
    useClaimNFT,
    useContract,
} from "@thirdweb-dev/react";
import { NextPageWithLayout } from "../_app";
import { DesktopNavbarComponent } from "@components/navbar/navbar";
import styles from "./page.module.css";
import { useCartStore } from "src/store/cart.store";
import toast from "react-hot-toast";
import { CheckoutForm } from "@components/ClaimPage/claim-form.component";
import { DefaultLayout } from "@components/layouts/defaultLayout";
import dynamic from "next/dynamic";

const NoSSRCheckoutFormContainer = dynamic(
    () => import("@components/checkout/checkout.container"),
    {
        ssr: false,
    },
);
const CheckoutPage: NextPageWithLayout = () => {
    return <NoSSRCheckoutFormContainer></NoSSRCheckoutFormContainer>;
};

CheckoutPage.getLayout = DefaultLayout;

export default CheckoutPage;
