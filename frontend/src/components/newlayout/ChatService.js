import { v4 as uuidv4 } from 'uuid'

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
    },

    addConversation: (newConversation) => {
        return new Promise((resolve) => {
            const conversation = {
                id: newConversation.id,
                name: "You",
                updated_at: new Date().toLocaleDateString(),
                title: newConversation.initialPrompt
            }

            MOCK_CONVERSATIONS.unshift(conversation)
            resolve([...MOCK_CONVERSATIONS])
        })
    },

    createChat: () => {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                // Generate a new chat ID
                const newChatId = uuidv4()
                
                // Create a mock response that matches what the backend would return
                const mockResponse = {
                    id: newChatId,
                    messages: [],  // Empty messages array for new chat
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    status: 'active'
                }

                // Add to our mock conversations list
                MOCK_CONVERSATIONS.unshift({
                    id: newChatId,
                    name: "You",
                    updated_at: new Date().toLocaleDateString(),
                    title: "New Chat"
                })

                resolve(mockResponse)
            }, 500) // Simulate 500ms network delay
        })
    },

    sendChatMessage: (chatId, message) => {
        // Create a mock response stream
        const encoder = new TextEncoder()
        const stream = new ReadableStream({
            async start(controller) {
                // Simulate streaming response
                // const response = message
                const response = "## Heading\n\nBased on your Chakra package. So [click here](http://chakra-ui.com) to confirm your plan.\n\n- first item\n- second item\n"
                // const chunks = response.split('\n\n')
                const chunks = response.split(/(?<=\n)/)

                for (let i = 0; i < chunks.length; i++) {
                    // Add a small delay between chunks to simulate streaming
                    await new Promise(resolve => setTimeout(resolve, 100))
                    // Send the chunk as SSE data, add space after each word except the last one
                    const chunk = chunks[i] + (i < chunks.length - 1 ? ' ' : '')
                    controller.enqueue(encoder.encode(`data: ${chunk}\n\n`))
                }
                controller.close()
            }
        })

        return stream
    },

    // TODO
    loadChatHistory: async (chatId) => {
        const response = await fetch('http://localhost:8001' + `/c/${chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            return Promise.reject({ status: response.status, data: await response.json() })
        }

        return response.body
    }
};