import { useRouter } from 'next/router'
import Layout from '../../components/Layout/Layout'
import { Flex, Text, Avatar, useToast } from "@chakra-ui/react";
import Contract from '../../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';
import { ethers } from "ethers";
import Link from "next/link";
import useEthersProvider from "../../hook/useEthersProvider";
import { useState, useEffect } from "react";
import classes from '../../components/Posts/Posts.module.css'
import { ArrowUpIcon, ArrowDownIcon, ChatIcon } from '@chakra-ui/icons'
const contractAddress = "0xfa3f0A9D771861EdDF2c5F2FD5C3aaF32a6fb93f";

const Post = () => {

    const router = useRouter()
    const { id } = router.query

    const toast = useToast()
    const { account, setAccount, provider } = useEthersProvider();

    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState<any[]>(null)

    useEffect(() => {
        if(account) {
            getPostAndComments()
        }
    }, [account])

    const getPostAndComments = async() => {
        const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
        const post = await contract.allThePosts(id);
        const comments = await contract.getResponsesOfAPost(id);
        setPost(post);
        setComments(comments);
    }

    return (
        <Layout>
            <Flex
                align="center"
                justify="center"
                width="100%"
                padding="1rem"
                direction="column"
            >
                {account ? (
                    post && comments && (
                        <>
                            <Flex direction="column" className={classes.card}>
                                <Flex align="center">
                                    <Avatar bg='orange.500' /> 
                                    <Text fontWeight="bold" color="orange.700" ml="1rem">{post.author.substring(0, 5)}...{post.author.substring(post.author.length - 4)}</Text>
                                </Flex>
                                <Text mt="1rem" mb="1rem">{post.post}</Text>
                                <Flex mt="1rem" align="center">
                                    <Text>{post.votes.toString()}</Text>
                                    <ArrowUpIcon color="green" ml="0.25rem" onClick={() => vote('up', post.id)} className={classes.buttonVote} />
                                    <ArrowDownIcon color="red" ml="0.25rem" onClick={() => vote('down', post.id)} className={classes.buttonVote} />
                                </Flex>
                            </Flex>
                            <Flex
                                justify="center"
                            >
                                <Text fontSize='4xl' mt="2rem" mb="1rem">Comments</Text>
                            </Flex>
                            <Flex
                                direction="column"
                                width="100%"
                            >
                                {
                                    comments.map(comment => {
                                        return (
                                            <Flex direction="column" className={classes.cardComment} key={comment.id}>
                                                <Flex align="center">
                                                    <Avatar bg='orange.500' /> 
                                                    <Text fontWeight="bold" color="orange.700" ml="1rem">{comment.author.substring(0, 5)}...{comment.author.substring(comment.author.length - 4)}</Text>
                                                </Flex>
                                                <Text mt="1rem" mb="1rem">{comment.response}</Text>
                                            </Flex>
                                        )
                                    })
                                }
                            </Flex>
                        </>
                    )
                ) : (
                    <Flex
                        align="center"
                        justify="center"
                    >
                        <Text>Please connect your wallet.</Text>
                    </Flex>
                )}
            </Flex>
        </Layout>
    )
}

export default Post;