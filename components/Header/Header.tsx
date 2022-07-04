import useEthersProvider from "../../hook/useEthersProvider";
import { useState } from "react";
import { Flex, Text, Button, useToast, Spinner, chakra } from "@chakra-ui/react"
import { hasMetamask } from "../../utils/hasMetamask";
import { ethers } from "ethers";
import Link from "next/link";

const Header = () => {

    const { account, setAccount, provider } = useEthersProvider();
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const connectWallet = async() => {
        if(hasMetamask()) {
            setIsLoading(true)
            if(provider) {
                let network: any;
                network = await provider.getNetwork()
                if(network !== null) {
                    if(network.chainId !== 1) {
                        const resultAccount = await provider.send("eth_requestAccounts", [])
                        setAccount(ethers.utils.getAddress(resultAccount[0]))
                        setIsLoading(false)
                        toast({
                            title: 'Congratulations',
                            description: 'You wallet has been successfully connected!',
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                            variant: 'top-accent',
                        })
                    }
                    else {
                        setAccount(null)
                        setIsLoading(false)
                        toast({
                            title: 'An error occured',
                            description: 'Please select Ethereum Main Network on Metamask',
                            status: 'error',
                            duration: 5000,
                            isClosable: true,
                            variant: 'top-accent',
                        })
                    }
                }
            }
        }
        else {
            toast({
                title: 'An error occured',
                description: 'Please install Metamask extension on your browser.',
                status: 'error',
                duration: 5000,
                isClosable: true,
                variant: 'top-accent',
            })
        }
    }

    return (
        <>
            <Flex
                justifyContent="space-between"
                align="center"
                p="2rem"
            >
                <Text>Reddit Clone</Text>
                {isLoading ? (
                    <Spinner />
                ) : (   
                    account ? (
                        <Text>
                            Connected account : <chakra.span color="orange" fontWeight="bold">{account.substring(0, 5)}...{account.substring(account.length - 4)}</chakra.span>
                        </Text>
                    ) : (
                        <Button colorScheme="orange" onClick={() => connectWallet()}>
                            Connect
                        </Button>
                    )
                )}
            </Flex>
            {account && (
                <Flex
                    p="2rem"
                    width="30%"
                    justify="space-between"
                    align="center"
                >
                    <Link href="/">All the posts</Link>
                    <Link ml="1rem" href="/CreatePost">Create Post</Link>
                </Flex>
            )}
        </>
    )
}

export default Header;