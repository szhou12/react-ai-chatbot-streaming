import { Container, Flex, Stack } from '@chakra-ui/react'
import { Navbar } from './Navbar'
import { Header } from './Header'
import { Sidebar, Sidebar2, Sidebar3, CollapsibleSidebar, TemplateSidebar, TemplateSidebarThreeLayer } from './Sidebar'
import { Content, Content2, Content3 } from './Content'

/**
 * 
 * Right column: Content as whole
 * Inside Content: header + main content + textarea
 * Header: sticky to the top
 * 
 * Mobile view: Navbar takes Dashboard
 * Desktop view: header takes Dashboard
 */
function Chatbot2() {
    return (
        <>
            <Navbar hideFrom="md" position="sticky" top="0" />

            <Flex 
                flex="1"
            >

                <Flex
                    hideBelow="md" 
                    maxW="xs" 
                    position="sticky" 
                    top="0" 
                    direction="column"
                    height="100vh" 
                    p={1}
                    bg="purple.800"
                >
                    {/* <Sidebar3 /> */}
                    {/* <CollapsibleSidebar /> */}
                    {/* <TemplateSidebar /> */}
                    <TemplateSidebarThreeLayer />
                </Flex>


                <Flex 
                    bg="blackAlpha.500"
                    flex="1"
                    direction="column"
                    height="100vh"
                    p={1}
                    alignItems="stretch"
                >
                    <Content3 />
                </Flex>
            </Flex>
        </>
    )
}

export default Chatbot2