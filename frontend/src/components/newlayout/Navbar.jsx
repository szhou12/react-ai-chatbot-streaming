import { useState, useEffect } from 'react'
import { 
    Box,
    Text,
    Button,
    ButtonGroup,
    Container, 
    Flex,
    HStack, 
    IconButton, 
    Drawer, 
    CloseButton, 
    Stack,
    VStack,
    Portal, 
    Image,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react'
import { useQuery } from "@tanstack/react-query"
import { Link } from '@tanstack/react-router'
import { LuAlignLeft, LuLayoutDashboard } from 'react-icons/lu'
import { BsPencilSquare, BsSearch } from "react-icons/bs"
import { Tooltip } from "@/components/ui/tooltip"

// import { SidebarContent } from './sidebarmain/SidebarContent'
import { SidebarChatList } from './sidebarmain/SidebarChatList'
import { SidebarFooter } from './sidebarbottom/SidebarFooter'
import { ChatService } from './sidebarmain/SidebarContent'


/**
 * 
 * Sidebar in mobile view.
 * 
 * TODO: use hook to get role, link the dashboard
 * 
 */
export const Navbar = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const role = "admin"

    // const { data: chats, isPending, error } = useQuery({
    //     queryFn: () => ChatService.getConversations(),
    //     queryKey: ["userChats"],
    // })

    /** Delete: Mimic useQuery */
    const [chats, setChats] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsPending(true);
                // Simulate API delay
                const data = await ChatService.getConversations();
                // const data = MOCK_CONVERSATIONS;
                setChats(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsPending(false);
            }
        };

        fetchData();
    }, []);
    /** Delete End */

    // return (
    //     <Box 
    //         minH="16"
    //         bg="green.500"
    //         css={{
    //             backgroundClip: 'padding-box',
    //             backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fillRule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
    //             display: 'flex',
    //             width: '100%',
    //         }}
    //         {...props}
    //     >
    //         <Text> Navbar </Text>
    //     </Box>
    // )

    return (
        <Container py="1.5" background="bg.panel" borderBottomWidth="1px" {...props}>
            <HStack justify="space-between">
                {/* left element of Navbar */}
                <Drawer.Root 
                    placement="start"
                    isOpen={isOpen}
                    onOpenChange={(e) => setIsOpen(e.open)}
                >
                    <Tooltip showArrow content="Open Sidebar">
                        <Drawer.Trigger asChild>
                            <IconButton 
                                variant="ghost"
                                aria-label="Open Menu"
                                color="black"
                            >
                                <LuAlignLeft />
                            </IconButton>
                        </Drawer.Trigger>
                    </Tooltip>

                    <Portal>
                        <Drawer.Backdrop />
                        <Drawer.Positioner>
                            <Drawer.Content>

                                <Drawer.Header>
                                    <Drawer.Title flex="1">
                                        Conversations
                                    </Drawer.Title>

                                    <ButtonGroup>
                                        <IconButton variant="ghost" color="black">
                                            <BsSearch />
                                        </IconButton>
                                    </ButtonGroup>

                                    <Drawer.CloseTrigger asChild pos="initial">
                                        <CloseButton variant="ghost" color="black" />
                                    </Drawer.CloseTrigger>
                                </Drawer.Header>

                                <Drawer.Body>
                                    <SidebarChatList 
                                        data={chats}
                                        isPending={isPending}
                                        error={error}
                                        w="full"
                                    />
                                </Drawer.Body>

                                <Drawer.Footer>
                                    <SidebarFooter w="full" />
                                </Drawer.Footer>

                            </Drawer.Content>
                        </Drawer.Positioner>
                    </Portal>
                </Drawer.Root>

                {/* middle element of Navbar */}
                <Text w="100px" maxW="2xs">Logo Placeholder</Text>

                {/* right element of Navbar */}
                <HStack justify="space-between" >

                    <Tooltip showArrow content="New Chat">
                        <IconButton 
                            variant="ghost"
                            aria-label="New Chat"
                            color="black"
                        >
                            <BsPencilSquare />
                        </IconButton>
                    </Tooltip>

                    {role !== "client" && (
                        <Tooltip showArrow content="Staff Dashboard">
                            <IconButton 
                                variant="ghost"
                                aria-label="Dashboard"
                                color="black"
                            >
                                <LuLayoutDashboard />
                            </IconButton>
                        </Tooltip>
                    )}
                    
                </HStack>
                

            </HStack>
        </Container>
    )
}