import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import Logo from "src/icon-components/Logo";
import { useMagicStore } from "src/store/magic.store";
import styles from "./navbar.module.css";

export const Navbar: React.FC<{ className?: string }> = (props) => {
    const { className } = props;
    const { magicProvider, magic } = useMagicStore();
    const address = useAddress();
    const login = async () => {
        magicProvider.listAccounts().then((accounts) => {
            console.log(accounts);
        });
    };
    return (
        <div>
            <nav
                className={
                    "flex justify-center bg-[#131313] backdrop-blur-md w-full " +
                    className
                }
            >
                <div className={styles.navbarContainer + " w-full py-2 px-8"}>
                    <div className="items-center hidden lg:flex">
                        <Link
                            href="/"
                            className="flex text-white hover:text-gray-500
                    cursor-pointer transition-colors duration-300"
                        >
                            Список товаров
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Link href={"/"} className="cursor-pointer">
                            <Logo />
                        </Link>
                    </div>

                    <div className="flex items-center w-full justify-end gap-4">
                        <a
                            className="flex text-white hover:text-gray-500
                    cursor-pointer transition-colors duration-300"
                        >
                            Профиль
                        </a>
                        {address ? (
                            <button
                                onClick={() => magic.connect.showWallet()}
                                className="flex text-white hover:text-gray-500
                    cursor-pointer transition-colors duration-300"
                            >
                                Кошелек
                            </button>
                        ) : (
                            <button
                                onClick={() => login()}
                                className="flex text-white hover:text-gray-500
                    cursor-pointer transition-colors duration-300"
                            >
                                Войти
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};
