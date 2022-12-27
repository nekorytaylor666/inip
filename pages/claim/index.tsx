import { DefaultLayout } from "@components/layouts/defaultLayout";
import dynamic from "next/dynamic";
import React from "react";

const NoSSRClaimPage: any = dynamic(
    () => import("@components/claim/claim-form.component"),
    {
        ssr: false,
    },
);
const ClaimPage = () => {
    return (
        <div>
            <NoSSRClaimPage></NoSSRClaimPage>
        </div>
    );
};

ClaimPage.getLayout = DefaultLayout;

export default ClaimPage;
