import { DesktopNavbarComponent, Navbar } from "@components/navbar/navbar";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import styles from "./page.module.css";
export const DefaultLayout = (page: ReactElement): ReactNode => (
    <>
        <div className={styles.pageContainer + "   "}>
            <Navbar className="h-full border-b border-solid border-gray-600  " />
            <main className="bg-[#131313] h-full text-white">{page}</main>
        </div>
    </>
);
