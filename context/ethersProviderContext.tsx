import React, { useEffect, useState, Dispatch, SetStateAction, Provider } from "react";
import { hasMetamask } from "../utils/hasMetamask";
import { ethers } from "ethers";
import { string } from "hardhat/internal/core/params/argumentTypes";
import { ReactElement } from "react";

type Props = {
  children: React.ReactNode;
};

type Context = {
  account: string | null;
  provider: ethers.providers.Provider | null;
  setAccount: Function;
};

const initialContext: Context = {
    account: null,
    provider: null,
    setAccount: (): void => {
        throw new Error('setAccount function must be overridden');
  },
};

const EthersContext = React.createContext(initialContext)

export const EthersProvider = (props: { children: ReactElement }) => {

    const [account, setAccount] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.providers.Provider | null>(null);

    useEffect(() => {
        if(hasMetamask()) {
            window.ethereum.on('chainChanged', () => {
                setAccount(null)
                setProvider(new ethers.providers.Web3Provider(window.ethereum))
            })
            window.ethereum.on('disconnect', () => {
                setAccount(null)
                setProvider(new ethers.providers.Web3Provider(window.ethereum))
            })
            window.ethereum.on('accountsChanged', () => {
                setAccount(null)
                setProvider(new ethers.providers.Web3Provider(window.ethereum))
            })
        }
    })

    useEffect(() => {
        if(hasMetamask()) {
            setProvider(new ethers.providers.Web3Provider(window.ethereum));
        }
    }, [])

    return (
        <EthersContext.Provider
            value={{
                account,
                provider,
                setAccount
            }}
        >
            {props.children}
        </EthersContext.Provider>
    )
}

export default EthersContext;