import React, { useEffect, useState } from "react";

import { Container, Header, Main, Footer, Cards } from "@components";
import {
    useAddress,
    useContract,
    useDisconnect,
    useSDK,
} from "@thirdweb-dev/react";
import { useMagic } from "@thirdweb-dev/react/evm/connectors/magic";
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import { magicLinkWalletConnector } from "src/utils/magiclinkConnector";
import { useMagicStore } from "src/store/magic.store";

const styles = {} as any;
const Home: React.FC = () => {
    const { magic, magicProvider } = useMagicStore();
    const [email, setEmail] = useState<string>(""); // State to hold the email address the user entered.
    const { contract } = useContract(
        "0x4e43D67e37d43c71a6DD3Dc07B292449c2a56E5d",
        "edition-drop",
    );

    const address = useAddress();
    const login = async () => {
        magicProvider.listAccounts().then((accounts) => {
            console.log(accounts);
        });
    };
    const claim = async () => {
        console.log(address);
    };
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.h1}>thirdweb + Magic.Link</h1>
                <p>address:{address}</p>
                <button onClick={() => login()}>connect</button>
                <button onClick={() => claim()}>Claim</button>
            </div>
        </>
    );
};

export default Home;
