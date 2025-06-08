import { useState, useEffect } from 'react'
import { 
    Box, 
    Center,
    Text,
    Flex,
    Textarea,
} from '@chakra-ui/react'
import { useImmer } from 'use-immer'
import { parseSSEStream } from '@/utils'

import { ThreeLayerLayout } from './ThreeLayerLayout'
import { ChatInput } from './contentbottom/ChatInput'
import { ChatMessages } from './contentmain/ChatMessages'
import { ChatService } from './ChatService'


/**
 * 
 * single layout: content as whole
 */
const Content = (props) => {
    return (
        <Box 
            minH="2xl"
            borderWidth="1px" 
            bg="green.500"
            css={{
                backgroundClip: 'padding-box',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fillRule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                display: 'flex',
                width: '100%',
            }}
            {...props}
        >
            <Text> Content </Text>
        </Box>
    )
}

/**
 * 3 parts content: header + main content + textarea
 * header: sticky to the top
 * main content: scrollable
 * textarea: sticky to the bottom
 */
const Content2 = () => {

    return (
        <>
            {/* Sticky Top */}
            <Box
                position="sticky" 
                top="0" 
                zIndex="sticky"
                bg="pink.500"
            >
                <Text> Header </Text>
            </Box>

            {/* Scrollable Main Area */}
            <Box 
                flex="1" 
                overflowY="auto"
                bg="blue.500"
                p={4}
            >
                <Text>Main Content Area</Text>
            </Box>

            {/* Sticky Bottom */}
            <Box 
                position="sticky" 
                bottom="0" 
                zIndex="sticky"
                bg="green.500"
                borderTopWidth="1px"
                p={4}
            >
                <Textarea 
                    placeholder="Type your message..."
                    resize="none"
                    rows={2}
                />
            </Box>

        </>
    )

}

/**
 * 3-layer structure abstraction
 */
const Content3 = () => {

    const Header = () => {
        return (
            <Text> Header </Text>
        )
    }

    const Main = () => {
        return (
            <Text>Main Content Area</Text>
        )
    }

    const Bottom = () => {
        return (
            <Textarea 
                placeholder="Type your message..."
                resize="none"
                rows={2}
            />
        )
    }

    return (
        <ThreeLayerLayout
            top={<Header />}
            topProps={{bg: 'pink.500'}}
            main={<Main />}
            mainProps={{bg: 'blue.500'}}
            bottom={<Bottom />}
            bottomProps={{bg: 'green.500', borderTopWidth:"1px", p:4}}
        />
    )
}

const ChatbotContent = () => {

    const [messages, setMessages] = useImmer([])
    const [newMessage, setNewMessage] = useState('')

    const isLoading = messages.length && messages[messages.length - 1].loading

    const urlChatId = null

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

        try {
            let currentChatId = urlChatId
            
            // If no chatId in URL, create new chat
            if (!currentChatId) {
                const { id } = await ChatService.createChat()
                currentChatId = id
                // Update URL with new chatId
                // navigate({ 
                //     to: '/c/$chatId',
                //     params: { chatId: id }
                // })
            }

            const response = await ChatService.sendChatMessage(currentChatId, trimmedMessage)
            for await (const textChunk of parseSSEStream(response)) {
                setMessages(draft => {
                    draft[draft.length - 1].content += textChunk
                })
            }
            setMessages(draft => {
                draft[draft.length - 1].loading = false
            })
        } catch (error) {
            console.error(error)
            setMessages(draft => {
                draft[draft.length - 1].loading = false
                draft[draft.length - 1].error = true
            })
        }
    }




    return (
        <ThreeLayerLayout
            main={
                <>
                    {messages.length === 0 ? (
                        <Text>INSERT PREDEFINED PROMPTS HERE</Text>
                    ) : (
                        <ChatMessages
                            messages={messages}
                            isLoading={isLoading}
                        />
                    )}
                </>
            }
            mainProps={{bg: 'blue.500'}}
            bottom={
                <>
                    <ChatInput
                        newMessage={newMessage}
                        setNewMessage={setNewMessage}
                        submitNewMessage={submitNewMessage}
                        isLoading={isLoading}
                    />

                    <Center height="7" bg="currentBg">
                        <Text textStyle="xs" color="fg.subtle" textAlign="center">
                            Our AI model can make mistakes. Be sure to check important info.
                        </Text>
                    </Center>
                </>
                
            }
            bottomProps={{bg: 'green.500', borderTopWidth:"1px", p: 2}}
        />
    )
}

export { Content, Content2, Content3, ChatbotContent }