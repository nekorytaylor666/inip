import { Navbar } from "@components/navbar/navbar";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import styles from "./page.module.css";
export const DefaultLayout = (page: ReactElement): ReactNode => (
    <>
        <div
            className={
                styles.pageContainer +
                "  divide-y divide-solid divide-gray-600 "
            }
        >
            <Navbar className="h-full" />
            <main className="bg-[#131313] h-full text-white">{page}</main>
        </div>
    </>
);
