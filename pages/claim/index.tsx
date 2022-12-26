import ClaimFormPage from "@components/claim/claim-form.component";
import { DefaultLayout } from "@components/layouts/defaultLayout";
import React from "react";

const ClaimPage = () => {
    return (
        <div>
            <ClaimFormPage></ClaimFormPage>
        </div>
    );
};

ClaimPage.getLayout = DefaultLayout;

export default ClaimPage;
