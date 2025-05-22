import { useState } from 'react'
import { 
    Box,
    Flex, 
    Text,
    VStack,
    Container,
    Stack,
    Heading,
    Span,
} from '@chakra-ui/react'
import { useImmer } from 'use-immer'

import api from '@/api'
import {ChatService} from '@/chatService'
import { parseSSEStream } from '@/utils'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'

function Chatbot() {
    const [chatId, setChatId] = useState(null)
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useImmer([]) // code more readable than useState

    const isLoading = messages.length && messages[messages.length - 1].loading

    async function submitNewMessage() {
        const trimmedMessage = newMessage.trim()
        if (!trimmedMessage || isLoading) return

        setMessages(draft => [...draft,
            {role: 'user', content: trimmedMessage},
            {role: 'assistant', content: '', sources: [], loading: true}
        ])
        // sources[]: document references holder

        // Clear the input field after the user sends a message
        setNewMessage('')

        let chatIdOrNew = chatId
        try {
            if (!chatId) {
                const { id } = await ChatService.createChat()
                setChatId(id)
                chatIdOrNew = id
            }

            const response = await ChatService.sendChatMessage(chatIdOrNew, trimmedMessage)
            for await (const textChunk of parseSSEStream(response)) {
                setMessages(draft => {
                    draft[draft.length - 1].content += textChunk
                })
            }
            setMessages(draft => {
                draft[draft.length - 1].loading = false
            })
        } catch (error) {
            console.log(error)
            setMessages(draft => {
                draft[draft.length - 1].loading = false
                draft[draft.length - 1].error = true
            })
        }
    }

    return (
        // <Flex
        //     position="relative"
        //     flex="1"
        //     direction="column"
        //     gap={6}
        //     pt={6}
        // >
        //     {messages.length === 0 && (
        //         <Box
        //             mt={3}
        //             fontFamily="sans-serif"
        //             color="blue.500"
        //             fontSize="xl"
        //             fontWeight="light"
        //         >
        //             <VStack align="start" spacing={2}>
        //                 <Text>👋 Welcome!</Text>
        //                 <Text>
        //                     I am powered by the latest technology reports from leading institutions like the World Bank, the World Economic Forum, McKinsey, Deloitte and the OECD.
        //                 </Text>
        //                 <Text>Ask me anything about the latest technology trends.</Text>
        //             </VStack>
        //         </Box>
        //     )}

        //     <ChatMessages 
        //         messages={messages}
        //         isLoading={isLoading}
        //     />
        //     <ChatInput
        //         newMessage={newMessage}
        //         setNewMessage={setNewMessage}
        //         submitNewMessage={submitNewMessage}
        //         isLoading={isLoading}
        //     />
        // </Flex>
        <Flex
            direction="column"
            flex="1"
            height="100%" // Use height 100% to fill parent instead of 100vh
            width="100%" // Ensure full width
            // overflow="hidden" // Prevent overall scrolling so footer fixed at bottom
            position="relative"
            // gap={6}
            // pt={12} 
        >

            <Box 
                flex="1" 
                overflow="auto" // enable scrolling for this box only
                pt={{ base: "8", md: "12" }}  // Account for navbar height
                pb={{ base: "8", md: "12" }}  // Account for navbar height
            >
                {messages.length === 0 ? (
                    <Container maxW="4xl">
                        <Stack gap="8">
                            <Heading size="4xl" fontWeight="normal">
                                <Span color="colorPalette.fg">Hello, Client</Span> <br />
                                <Span color="fg.muted">How can I help you today?</Span>
                            </Heading>

                            {/* <PredefinedPrompts
                                onPromptSelect={handlePromptSelect}
                            /> */}

                        </Stack>
                    </Container>
                ) : (
                    <ChatMessages 
                        messages={messages}
                        isLoading={isLoading}
                    />
                )}

                {/* <Demo /> */}

            </Box>

            <Box 
                // flex="0" 
                // width="100%"
                position="sticky"
                bottom="0"
                flexShrink={0}
                bg="white"
                py={4}
            >
                
                {/* <ChatTextarea
                    isNewChat={true}
                    onNewChat={handlePromptSelect}
                /> */}

                <ChatInput
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    submitNewMessage={submitNewMessage}
                    isLoading={isLoading}
                />

            </Box>

        </Flex>
    )
}

export default Chatbot