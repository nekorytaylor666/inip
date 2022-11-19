import { DefaultLayout } from "@components/layouts/defaultLayout";
import { NextPageWithLayout } from "pages/_app";
import React from "react";

const DreamItemPage: NextPageWithLayout = () => {
    return (
        <div className="">
            <div className="grid grid-cols-2">
                <div></div>
                <DreamDetails></DreamDetails>
            </div>
        </div>
    );
};

const DreamDetails = () => {
    return <h1 className="font-display text-8xl p-10">Майка наруто неджи</h1>;
};

DreamItemPage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default DreamItemPage;
