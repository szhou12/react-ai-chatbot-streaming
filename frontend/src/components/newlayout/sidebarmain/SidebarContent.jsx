// frontend/src/components/Chat/SidebarContent.jsx
import { 
    Box,
    Stack,
    Text,
    Flex,
    Spinner,
    VStack,
} from '@chakra-ui/react'
// import { Link } from '@tanstack/react-router'
import { useQuery } from "@tanstack/react-query"
import { BsChatTextFill } from 'react-icons/bs'
import { useState, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { SidebarChatList } from './SidebarChatList'
// import { SearchField } from '../Common/SearchField'

// import { ChatService } from './mocks/chatService'
import { ChatService } from '../ChatService'



export const SidebarContent = ({ ...props }) => {
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

    return (
        // <Stack flex="1" overflow="hidden" spacing="8" bg="red.500">
        <Stack gap="1" bg="red.500" {...props}>
            <Text fontSize="md" fontWeight="medium" alignSelf="start">
                Conversations ({chats?.length})
            </Text>


            <SidebarChatList 
                data={chats}
                isPending={isPending}
                error={error} 
            />
            
        </Stack>
    )
}