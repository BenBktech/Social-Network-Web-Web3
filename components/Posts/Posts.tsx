import { Flex, Text, Avatar, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import classes from './Posts.module.css'
import { ArrowUpIcon, ArrowDownIcon, ChatIcon } from '@chakra-ui/icons'
import Contract from '../../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';
import { ethers } from "ethers";
import Link from "next/link";
import useEthersProvider from "../../hook/useEthersProvider";
const contractAddress = "0x7a1d0D760cAB0443d856216a6E01C2735609EcAe";

const Posts = (props: {getDatas: Function, allPosts: any[]}) => {

    const toast = useToast()
    const { account, setAccount, provider } = useEthersProvider();

    const vote = async(arg: string, id: string) => {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        if(arg === 'up') {
            try {
                let transaction = await contract.voteUp(parseInt(id));
                await transaction.wait();
                toast({
                    title: 'Congratulations',
                    description: 'You have voted for this post !',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    variant: 'top-accent',
                })
                props.getDatas()
            }
            catch(err: any) {                
                toast({
                    title: 'Error',
                    description: 'An error occured.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    variant: 'top-accent',
                })
            }
        }
        if(arg === 'down') {
            try {
                let transaction = await contract.voteDown(parseInt(id));
                await transaction.wait();
                toast({
                    title: 'Congratulations',
                    description: 'You have voted for this post !',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    variant: 'top-accent',
                })
                props.getDatas()
            }
            catch(err: any) {
                toast({
                    title: 'Error',
                    description: 'An error occured.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    variant: 'top-accent',
                })
            }
        }
    }

    return (
        <Flex
            direction="column"
            width="100%"
            padding="1rem"
        >
            {
                props.allPosts.map(post => {
                    return (
                        <Flex direction="column" className={classes.card} key={post.id}>
                            <Flex align="center">
                                <Avatar bg='orange.500' /> 
                                <Text fontWeight="bold" color="orange.700" ml="1rem">{post.author.substring(0, 5)}...{post.author.substring(post.author.length - 4)}</Text>
                            </Flex>
                            <Text mt="1rem" mb="1rem">{post.post}</Text>
                            <Flex mt="1rem" align="center">
                                <Text>{post.votes.toString()}</Text>
                                <ArrowUpIcon color="green" ml="0.25rem" onClick={() => vote('up', post.id)} className={classes.buttonVote} />
                                <ArrowDownIcon color="red" ml="0.25rem" onClick={() => vote('down', post.id)} className={classes.buttonVote} />
                                <Link href={'posts' + '/' + post.id}>
                                    <ChatIcon color="blue" ml="0.25rem" className={classes.buttonComments} />
                                </Link>
                            </Flex>
                        </Flex>
                    )
                })
            }
        </Flex>
    )
}

export default Posts;