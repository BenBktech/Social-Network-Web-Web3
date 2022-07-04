import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout/Layout'
import { Flex, Text } from '@chakra-ui/react'
import Posts from '../components/Posts/Posts'
import useEthersProvider from '../hook/useEthersProvider'
import { useEffect, useState } from 'react'
import Contract from '../artifacts/contracts/SocialNetwork.sol/SocialNetwork.json';
import { ethers } from 'ethers'

const contractAddress = "0xE6D7730a085c0DAABD161Ce863e21bf97132191e";

const Home: NextPage = () => {

  const { account, setAccount, provider } = useEthersProvider()
  const [allPosts, setAllPosts] = useState<any[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getDatas = async() => {
    setIsLoading(true);
    if(provider) {
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      const allThePosts = await contract.getAllThePosts();
      console.log(allThePosts)
      const reversedAllThePosts = [...allThePosts].reverse();
      setAllPosts(reversedAllThePosts)
      console.log(allPosts?.length);
    }
  }

  useEffect(() => {
    if(account) {
      getDatas()
    }
  }, [account])

  return (
    <Layout>
      <Flex
        align="center"
        justify="center"
        width="100%"
      >
        {account ?
          allPosts && allPosts.length > 0 ? (
            <Posts getDatas={getDatas} allPosts={allPosts} />
          ) : (
            <Text>There are not posts.</Text>
          )
        : (
          <Text>Please connect your wallet.</Text>
        )}
      </Flex>
    </Layout>
  )
}

export default Home
