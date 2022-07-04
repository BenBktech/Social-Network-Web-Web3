import Layout from "../components/Layout/Layout";
import { SyntheticEvent, useState } from "react";
import type { NextPage } from 'next'
import { Flex, Text, Textarea, Button, useToast, Spinner, UseToastOptions } from "@chakra-ui/react";
import useEthersProvider from "../hook/useEthersProvider";
import Contract from '../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';
import { ethers } from 'ethers'
import { useRouter } from 'next/router'

const contractAddress = "0xE6D7730a085c0DAABD161Ce863e21bf97132191e";

const CreatePost: NextPage = () => {

    const toast = useToast();
    const router = useRouter();

    const { account, setAccount, provider } = useEthersProvider()
    const [post, setPost] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleInputChange = (e: SyntheticEvent<EventTarget>) => {
        let inputValue = (e.target as HTMLTextAreaElement).value;
        setPost(inputValue)
    }

    const createPost = async() => {
        setIsLoading(true)
        if(provider) {
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
            try {
                let transaction = await contract.createPost(post);
                await transaction.wait();
                toast({
                    title: 'Congratulations',
                    description: 'You have voted for this post !',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    variant: 'top-accent',
                })
                setIsLoading(false)
                router.push("/")
            }
            catch {
                toast({
                    title: 'Error',
                    description: 'An error occured.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    variant: 'top-accent',
                })
                setIsLoading(false)
            }
        }
    }

    return (
        <Layout>
            <Flex
                direction="column"
                width="100%"
                p="2rem"
                align="center"
                justify="center"
            >
                {account ? (
                    isLoading ? (
                        <Spinner />
                    ) : (
                        <>
                            <Text mb='8px'>Your message</Text>
                            <Textarea
                                value={post}
                                onChange={handleInputChange}
                                placeholder='Your post there...'
                                size='sm'
                            />
                            <Button onClick={() => createPost()} width="100%" mt="1rem" colorScheme='orange'>Post</Button>
                        </>   
                    )
                ) : (
                    <Text>Please connect your Wallet</Text>
                )}
            </Flex>
        </Layout>
    )
}

export default CreatePost;