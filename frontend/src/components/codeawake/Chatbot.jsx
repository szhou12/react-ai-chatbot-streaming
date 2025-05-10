import { useState } from 'react'
import { 
    Flex, 
} from '@chakra-ui/react'
import { useImmer } from 'use-immer'

import api from '@/api'
import { parseSSEStream } from '@/utils'

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
            
        </Flex>
    )
}

export default Chatbot