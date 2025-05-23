import { Container, Flex, Stack } from '@chakra-ui/react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { Content } from './Content'
import { Header } from './Header'


function Chatbot() {
    return (
        <>
            <Navbar hideFrom="md" />

            <Flex 
                flex="1"
            >
                <Sidebar 
                    hideBelow="md" 
                    maxW="xs"         // set sidebar width proportion
                    position="sticky" 
                    top="0" 
                    height="100vh" 
                />

                <Stack 
                    // gap="12" // create space between Header and Content
                    // pb="12"  // create space at the bottom of Content
                    flex="1"    // fill remaining width excluding Sidebar
                    alignItems="stretch" // Header and Content both fill the full width of Stack
                >
                    <Header />

                    <Container maxW="4xl" bg="purple.500">
                        <Content />
                    </Container>
                </Stack>

            </Flex>
        </>
    )
}

export default Chatbot