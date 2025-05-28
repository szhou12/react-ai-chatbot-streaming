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


const MOCK_CONVERSATIONS = [
    {
        id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        name: "user1",
        updated_at: "1/1/2024",
        title: "This is conversation 1 conversationconversationconversationconversation"
    },
    {
        id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
        name: "user2",
        updated_at: "1/2/2024",
        title: "This is conversation 2"
    },
    {
        id: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
        name: "user3",
        updated_at: "1/3/2024",
        title: "This is conversation 3"
    },
    {
        id: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
        name: "user4",
        updated_at: "1/4/2024",
        title: "This is conversation 4"
    },
    {
        id: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
        name: "user5",
        updated_at: "1/5/2024",
        title: "This is conversation 5"
    },
    {
        id: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
        name: "user6",
        updated_at: "1/6/2024",
        title: "This is conversation 6"
    },
    {
        id: "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
        name: "user7",
        updated_at: "1/7/2024",
        title: "This is conversation 7"
    },
    {
        id: "8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w",
        name: "user8",
        updated_at: "1/8/2024",
        title: "This is conversation 8"
    },
    {
        id: "9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x",
        name: "user9",
        updated_at: "1/9/2024",
        title: "This is conversation 9"
    },
    {
        id: "0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y",
        name: "user10",
        updated_at: "1/10/2024",
        title: "This is conversation 10"
    },
    {
        id: "1k2l3m4n-5o6p-7q8r-9s0t-1u2v3w4x5y6z",
        name: "user11",
        updated_at: "1/11/2024",
        title: "This is conversation 11"
    },
    {
        id: "2l3m4n5o-6p7q-8r9s-0t1u-2v3w4x5y6z7a",
        name: "user12",
        updated_at: "1/12/2024",
        title: "This is conversation 12"
    },
    {
        id: "3m4n5o6p-7q8r-9s0t-1u2v-3w4x5y6z7a8b",
        name: "user13",
        updated_at: "1/13/2024",
        title: "This is conversation 13"
    },
    {
        id: "4n5o6p7q-8r9s-0t1u-2v3w-4x5y6z7a8b9c",
        name: "user14",
        updated_at: "1/14/2024",
        title: "This is conversation 14"
    }
]

export const ChatService = {
    getConversations: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay

        // Simulate error (uncomment to test error state)
        // throw new Error("Failed to fetch conversations");

        return MOCK_CONVERSATIONS;
    }
};


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