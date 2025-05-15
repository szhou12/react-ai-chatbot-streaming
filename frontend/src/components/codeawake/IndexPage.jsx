import {
    Box,
    Flex,
    Heading,
    Image,
    Link,
} from '@chakra-ui/react'

import Chatbot from './Chatbot'

export const IndexPage = () => {
    return (
        <Flex
            direction="column"
            minH="100%"
            w="full"
            maxW="3xl"
            mx="auto"
            px={4}
        >
            <Box
                as="header"
                position="sticky"
                top={0}
                flexShrink={0}
                zIndex={20}
                bg="white"
            >
                <Flex direction="column" w="full" h="full" gap={1} pt={4} pb={2}>
                    <Heading
                        as="h1"
                        fontFamily="sans-serif"
                        fontSize="1.65rem"
                        fontWeight="semibold"
                    >
                        AI Chatbot
                    </Heading>
                </Flex>
            </Box>
            
            <Chatbot />
        </Flex>
    )
}