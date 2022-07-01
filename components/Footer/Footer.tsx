import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Flex p="2rem" justifyContent="center">Your text here &copy; {new Date().getFullYear()}</Flex>
    )
}

export default Footer;