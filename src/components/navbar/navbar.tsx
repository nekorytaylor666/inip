import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import React from "react";
import Logo from "src/icon-components/Logo";
import { useMagicStore } from "src/store/magic.store";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import styles from "./navbar.module.css";

export const Navbar: React.FC<{ className?: string }> = (props) => {
    const { magicProvider, magic } = useMagicStore();
    const address = useAddress();
    const onLogin = async () => {
        magicProvider.listAccounts().then((accounts) => {
            console.log(accounts);
        });
    };

    const onShowWallet = () => {
        magic.connect.showWallet();
    };

    return (
        <>
            <div className="block lg:hidden">
                <MobileNavbarComponent
                    address={address}
                    onLogin={onLogin}
                    onShowWallet={onShowWallet}
                    {...props}
                ></MobileNavbarComponent>
            </div>
            <div className="hidden lg:block">
                <DesktopNavbarComponent
                    address={address}
                    onLogin={onLogin}
                    onShowWallet={onShowWallet}
                    {...props}
                ></DesktopNavbarComponent>
            </div>
        </>
    );
};

interface NavbarComponentProps {
    className?: string;
    address?: string;
    onShowWallet?: () => void;
    onLogin?: () => void;
}

const MobileNavbarComponent = (props) => {
    const { className, address, onLogin, onShowWallet } = props;
    return (
        <div className=" w-full bg-[#131313] h-full text-white flex items-center justify-between">
            <NavigationMenu.Root className="NavigationMenuRoot">
                <NavigationMenu.List className=" flex items-center justify-between w-full px-4">
                    <NavigationMenu.Item>
                        <NavigationMenu.Trigger>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                                />
                            </svg>
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content className="NavigationMenuContent">
                            <ul className="List two gap-4">
                                <ListItem title="Профиль" href="/profile">
                                    Взглянуть на профиль и приобретенный NFT
                                </ListItem>
                                {address ? (
                                    <button
                                        onClick={onShowWallet}
                                        className="flex text-black hover:text-gray-700
                    cursor-pointer transition-colors duration-300"
                                    >
                                        Кошелек
                                    </button>
                                ) : (
                                    <button
                                        onClick={onLogin}
                                        className="flex text-black hover:text-gray-700
                    cursor-pointer transition-colors duration-300"
                                    >
                                        Войти
                                    </button>
                                )}
                            </ul>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                    <div className="flex items-center">
                        <Link href={"/"} className="cursor-pointer">
                            <Logo />
                        </Link>
                    </div>
                    <Link href={"/profile"}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                        </svg>
                    </Link>
                    <NavigationMenu.Indicator className="NavigationMenuIndicator">
                        <div className="Arrow" />
                    </NavigationMenu.Indicator>
                </NavigationMenu.List>

                <div className="ViewportPosition px-4">
                    <NavigationMenu.Viewport className="NavigationMenuViewport" />
                </div>
            </NavigationMenu.Root>
        </div>
    );
};

interface ListItemProps {
    className?: string;
    children?: React.ReactNode;
    title: string;
}

const ListItem = React.forwardRef(
    (
        {
            className,
            children,
            title,
            href,
            ...props
        }: ListItemProps & { href: string },
        forwardedRef,
    ) => (
        <li>
            <NavigationMenu.Link asChild>
                <Link href={href} {...props} ref={forwardedRef as any}>
                    <>
                        <div className="ListItemHeading">{title}</div>
                        {children && <p className="ListItemText">{children}</p>}
                    </>
                </Link>
            </NavigationMenu.Link>
        </li>
    ),
);

export const DesktopNavbarComponent: React.FC<NavbarComponentProps> = (
    props,
) => {
    const { className, address, onLogin, onShowWallet } = props;

    return (
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
                    <Link
                        href="/profile"
                        className="flex text-white hover:text-gray-500
                    cursor-pointer transition-colors duration-300"
                    >
                        Профиль
                    </Link>
                    {address ? (
                        <button
                            onClick={onShowWallet}
                            className="flex text-white hover:text-gray-500
                    cursor-pointer transition-colors duration-300"
                        >
                            Кошелек
                        </button>
                    ) : (
                        <button
                            onClick={onLogin}
                            className="flex text-white hover:text-gray-500
                    cursor-pointer transition-colors duration-300"
                        >
                            Войти
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};
