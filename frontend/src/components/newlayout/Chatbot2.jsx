import { Container, Flex, Stack } from '@chakra-ui/react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { Content2 } from './Content'
import { Header } from './Header'

function Chatbot2() {
    return (
        <>
            <Navbar hideFrom="md" />

            <Flex 
                flex="1"
            >
                <Sidebar 
                    hideBelow="md" 
                    maxW="xs" 
                    position="sticky" 
                    top="0" 
                    height="100vh" 
                />

                <Container 
                    maxW="4xl" 
                    bg="purple.500"
                    flex="1"
                    display="flex"
                    flexDirection="column"
                    height="100vh"
                    p={0}
                >
                    <Content2 />
                </Container>
            </Flex>
        </>
    )
}

export default Chatbot2