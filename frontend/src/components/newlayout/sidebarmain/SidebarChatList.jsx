import { Stack, VStack, Text, Spinner } from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'

import { SidebarLink } from '../sidebarbottom/SidebarLink'

import { ChatTab } from './ChatTab'
// import { Route } from '@/routes/_chat-layout/chat-session'

export const SidebarChatList = ({ data, isPending, error }) => {
    // return (
    //     <Stack mt="2" spacing="4" flex="1" overflowY="auto" px="5" pb="5" bg="red.500">
    //         <Stack mt="2" spacing="4">
    //             <Stack spacing="0" mx="-4" bg="blue.500">
    //                 {isPending ? (
    //                     <VStack colorPalette="teal">
    //                         <Spinner 
    //                             color="colorPalette.600"
    //                             css={{ "--spinner-track-color": "colors.gray.200" }}
    //                             size="lg"
    //                         />
    //                         <Text color="colorPalette.600">Loading...</Text>
    //                     </VStack>
    //                 ) : error ? (
    //                     <Text px="4" color="red.500">Something went wrong!</Text>
    //                 ) : (
    //                     data?.map((message) => (
    //                         // <Link 
    //                         //     key={message.id} 
    //                         //     // to={Route.to}
    //                         //     params={{ chatId: message.id }}
    //                         //     style={{ 
    //                         //         textDecoration: 'none',
    //                         //         display: 'block'
    //                         //     }}
    //                         // >
    //                         //     <ChatTab data={message} />
    //                         // </Link>
    //                         <ChatTab data={message} />
    //                     ))
    //                 )}
    //             </Stack>
    //         </Stack>
    //     </Stack>
    // )

    // return (
    //     <Stack mt="2" spacing="40" flex="1" overflowY="auto" px="5" pb="5" bg="red.500">
    //         {isPending ? (
    //             <VStack colorPalette="teal">
    //                 <Spinner 
    //                     color="colorPalette.600"
    //                     css={{ "--spinner-track-color": "colors.gray.200" }}
    //                     size="lg"
    //                 />
    //                 <Text color="colorPalette.600">Loading...</Text>
    //             </VStack>
    //         ) : error ? (
    //             <Text px="4" color="red.500">Something went wrong!</Text>
    //         ) : (
    //             data?.map((message) => (
    //                 // <Link 
    //                 //     key={message.id} 
    //                 //     // to={Route.to}
    //                 //     params={{ chatId: message.id }}
    //                 //     style={{ 
    //                 //         textDecoration: 'none',
    //                 //         display: 'block'
    //                 //     }}
    //                 // >
    //                 //     <ChatTab data={message} />
    //                 // </Link>
    //                 // <ChatTab data={message} />
    //                 <a key={message.id} href={`/chat/${message.id}`}>
    //                     <ChatTab data={message} />
    //                 </a>
    //             ))
    //         )}
    //     </Stack>
    // )

    return (
        <Stack gap="1">
            {isPending ? (
                <VStack colorPalette="teal">
                    <Spinner 
                        color="colorPalette.600"
                        css={{ "--spinner-track-color": "colors.gray.200" }}
                        size="lg"
                    />
                    <Text color="colorPalette.600">Loading...</Text>
                </VStack>
            ) : error ? (
                <Text px="4" color="red.500">Something went wrong!</Text>
            ) : (
                data?.map((message) => (
                    <a key={message.id} href={`/chat/${message.id}`}>
                        <ChatTab data={message} />
                    </a>
                    // <SidebarLink href={`/chat/${message.id}`}>
                    //     <Text fontWeight="medium" truncate>
                    //         {message.title}
                    //     </Text>
                    // </SidebarLink>
                ))
            )}
        </Stack>
    )
}
