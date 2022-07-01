import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Flex, propNames } from "@chakra-ui/react";

const Layout = (props: { children: string }) => {
    return (
        <Flex
            width="100%"
            minHeight="100vh"
            background="#262626"
            color="#fff"
            direction="column"
        >
            <Header />
            <Flex
                flex="1"
            >
                {props.children}
            </Flex>
            <Footer />
        </Flex>
    )
}

export default Layout;