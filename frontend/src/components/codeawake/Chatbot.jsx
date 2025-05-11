import { useState } from 'react'
import { 
    Box,
    Flex, 
    Text,
    VStack,
} from '@chakra-ui/react'
import { useImmer } from 'use-immer'

import api from '@/api'
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
                const { id } = await api.createChat()
                setChatId(id)
                chatIdOrNew = id
            }

            const response = await api.sendChatMessage(chatIdOrNew, trimmedMessage)
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
        <Flex
            position="relative"
            flex="1"
            direction="column"
            gap={6}
            pt={6}
        >
            {messages.length === 0 && (
                <Box
                    mt={3}
                    fontFamily="sans-serif"
                    color="blue.500"
                    fontSize="xl"
                    fontWeight="light"
                >
                    <VStack align="start" spacing={2}>
                        <Text>👋 Welcome!</Text>
                        <Text>
                            I am powered by the latest technology reports from leading institutions like the World Bank, the World Economic Forum, McKinsey, Deloitte and the OECD.
                        </Text>
                        <Text>Ask me anything about the latest technology trends.</Text>
                    </VStack>
                </Box>
            )}

            <ChatMessages 
                messages={messages}
                isLoading={isLoading}
            />
            <ChatInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                submitNewMessage={submitNewMessage}
                isLoading={isLoading}
            />
        </Flex>
    )
}

export default Chatbot