import {
    Box,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Container,
} from '@chakra-ui/react'

import Chatbot from './Chatbot'

export const IndexPage = () => {
    // return (
    //     <Flex
    //         direction="column"
    //         minH="100%"
    //         w="full"
    //         maxW="3xl"
    //         mx="auto"
    //         px={4}
    //         bg="blue"
    //     >
    //         <Box
    //             as="header"
    //             position="sticky"
    //             top={0}
    //             flexShrink={0}
    //             zIndex={20}
    //             bg="white"
    //         >
    //             <Flex direction="column" w="full" h="full" gap={1} pt={4} pb={2}>
    //                 <Heading
    //                     as="h1"
    //                     fontFamily="sans-serif"
    //                     fontSize="1.65rem"
    //                     fontWeight="semibold"
    //                 >
    //                     AI Chatbot
    //                 </Heading>
    //             </Flex>
    //         </Box>
            
    //         <Chatbot />
    //     </Flex>
    // )

    return (
        <Flex direction="column" h="100vh">
            <Flex 
                flex="1"
                // overflow="hidden"
            >
                <Stack 
                    flex="1" // Stack expands to fill the available space
                    alignItems="stretch" // make all Stack's children to fill the width of the container horizontally
                    minH="0" // allows Stack to shrink to fit the remaining space, preventing overflow
                    // overflow="hidden" // Prevent outer scroll
                >
                    <Container 
                        display="flex" 
                        flex="1" // Container expands to fill the available space
                        maxW="100%"
                        p="0" // Remove container padding to prevent overflow
                        // overflow="hidden" // Prevent container scroll

                    >
                        <Chatbot />
                    </Container>

                </Stack>
            </Flex>
        </Flex>
    )
}