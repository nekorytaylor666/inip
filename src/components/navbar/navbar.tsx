import React from "react";
import Logo from "src/icon-components/Logo";
export const Navbar = () => {
    return (
        <div className="flex flex-col">
            <nav className="flex justify-center bg-black border-b border-gray-500 backdrop-blur-md w-full">
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

                    <div className="flex items-center ">
                        <a
                            className="flex text-white hover:text-gray-500
                    cursor-pointer transition-colors duration-300"
                        >
                            Профиль
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
};
