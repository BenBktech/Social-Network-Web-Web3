import { Flex, Text, Avatar, useToast, Textarea, Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import classes from './Posts.module.css'
import { ArrowUpIcon, ArrowDownIcon, ChatIcon } from '@chakra-ui/icons'
import Contract from '../../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';
import { ethers } from "ethers";
import Link from "next/link";
import useEthersProvider from "../../hook/useEthersProvider";
import Layout from "../Layout/Layout";
import {useRouter} from 'next/router'
const contractAddress = "0xE6D7730a085c0DAABD161Ce863e21bf97132191e";

const AddComments = (props: {comment: string, setComment: Function, postId: string, getPostAndComments: Function}) => {

    const toast = useToast()
    const router = useRouter()

    const { account, setAccount, provider } = useEthersProvider()
    const [isLoading, setIsLoading] = useState<boolean>(false) 

    const handleInputChange = (e: Event) => {
        let inputValue = e.target.value;
        props.setComment(inputValue)
    }

    const postComment = async() => {
        setIsLoading(true)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        try {
            let transaction = await contract.createResponse(props.postId, props.comment);
            await transaction.wait();
            toast({
                title: 'Congratulations',
                description: 'You have commented a post !',
                status: 'success',
                duration: 5000,
                isClosable: true,
                variant: 'top-accent',
            })
            setIsLoading(false)
            props.getPostAndComments();
            props.setComment('');
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

    return (
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
                        <Text mb='8px'>Your comment</Text>
                        <Textarea
                            value={props.comment}
                            onChange={handleInputChange}
                            placeholder='Your post there...'
                            size='sm'
                        />
                        <Button onClick={() => postComment()} width="100%" mt="1rem" colorScheme='orange'>Post</Button>
                    </>   
                )
            ) : (
                <Text>Please connect your Wallet</Text>
            )}
        </Flex>
    )
}

export default AddComments;