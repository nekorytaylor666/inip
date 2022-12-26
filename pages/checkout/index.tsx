import React from "react";

import { NextPageWithLayout } from "../_app";

import { DefaultLayout } from "@components/layouts/defaultLayout";
import dynamic from "next/dynamic";

const NoSSRCheckoutFormContainer: any = dynamic(
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
