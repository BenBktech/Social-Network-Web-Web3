import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { EthersProvider } from "../context/ethersProviderContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider>
        <EthersProvider>
          <Component {...pageProps} />
        </EthersProvider>
      </ChakraProvider>
  )
}

export default MyApp
