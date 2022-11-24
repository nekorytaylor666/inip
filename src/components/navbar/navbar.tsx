import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import Logo from "src/icon-components/Logo";
import { useMagicStore } from "src/store/magic.store";
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
                    "flex justify-center bg-black backdrop-blur-md w-full " +
                    className
                }
            >
                <div className="flex w-full justify-between py-2 px-8">
                    <div className="items-center hidden lg:flex">
                        <a
                            className="flex text-white hover:text-gray-500
                    cursor-pointer transition-colors duration-300"
                        >
                            Список товаров
                        </a>
                    </div>
                    <div className="flex items-center">
                        <a className="cursor-pointer">
                            <Logo />
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
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
