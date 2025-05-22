import { 
    Box, 
    Textarea, 
    IconButton, 
    Flex,
    HStack,
    Container,
} from "@chakra-ui/react"
import { FiSend } from "react-icons/fi"
import { LuImagePlus, LuMic, LuSendHorizontal } from 'react-icons/lu'

import useAutoSize from "@/hooks/useAutoSize"

// function ChatInput({ newMessage, isLoading, setNewMessage, submitNewMessage }) {
//     const textareaRef = useAutoSize(newMessage)

//     // Press Enter -> Send message
//     // Press Shift + Enter -> New line
//     // Can't send message while loading
//     function handleKeyDown(e) {
//         if (e.keyCode === 13 && !e.shiftKey && !isLoading) {
//             e.preventDefault() // Prevents the default Enter key behavior (which would add a new line)
//             submitNewMessage()
//         }
//     }

//     return (
//         <Box
//             position="sticky"
//             bottom="0"
//             flexShrink={0}
//             bg="white"
//             py={4}
//         >
//             <Box
//                 p={1.5}
//                 bg="blue.100" 
//                 borderRadius="3xl"
//                 zIndex={50}
//                 fontFamily="mono"
//                 // animation="chat 0.4s ease"
//                 transformOrigin="bottom"
//             >
//                 <Box
//                     pr={0.5}
//                     bg="white"
//                     position="relative"
//                     flexShrink={0}
//                     borderRadius="3xl"
//                     overflow="hidden"
//                     border="1px solid"
//                     borderColor="blue.500"
//                     _focusWithin={{
//                         borderColor: "blue.500",
//                         boxShadow: "0 0 0 2px var(--chakra-colors-blue-500)",
//                     }}
//                     transition="all 0.2s"
//                 >
//                     <Textarea
//                         ref={textareaRef}
//                         value={newMessage}
//                         onChange={(e) => setNewMessage(e.target.value)}
//                         onKeyDown={handleKeyDown}
//                         resize="none"
//                         rows={1}
//                         maxH="140px"
//                         px={4}
//                         pr="44px" // to leave space for the button
//                         py={2}
//                         bg="white"
//                         borderRadius="3xl"
//                         placeholder="Type a message"
//                         _placeholder={{
//                         color: "blue.500",
//                         lineHeight: "1rem",
//                         transform: {
//                             base: "translateY(-4px)",
//                             sm: "translateY(0)",
//                         },
//                         }}
//                         _focus={{ outline: "none" }}
//                     />

//                     <IconButton
//                         onClick={submitNewMessage}
//                         variant="ghost"
//                         position="absolute"
//                         top="50%"
//                         transform="translateY(-50%)"
//                         right={3}
//                         p={1}
//                         borderRadius="md"
//                         _hover={{ bg: "blue.200" }}
//                         aria-label="Send message"
//                     >
//                         <FiSend />
//                     </IconButton>

//                 </Box>

//             </Box>

//         </Box>
//     )

    
// }


function ChatInput({ newMessage, isLoading, setNewMessage, submitNewMessage }) {
    const textareaRef = useAutoSize(newMessage)

    // Press Enter -> Send message
    // Press Shift + Enter -> New line
    // Can't send message while loading
    function handleKeyDown(e) {
        if (e.keyCode === 13 && !e.shiftKey && !isLoading) {
            e.preventDefault() // Prevents the default Enter key behavior (which would add a new line)
            submitNewMessage()
        }
    }

    return (
        <Container maxW="4xl">
            <Flex 
                // as="form"
                // onSubmit={handleSubmit}
                bg="bg.muted" 
                borderRadius="l2" 
                px="4" 
                py="3" 
                align="flex-start"
                boxShadow="lg"
            >
                <Textarea
                    ref={textareaRef} // auto-adjust size of area
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    unstyled
                    outline="none"
                    bg="transparent"
                    resize="none"
                    width="full"
                    maxH="140px" // max height textarea can grow to
                    placeholder="Ask me anything about clean energy..."
                />

                <HStack>
                    <IconButton variant="ghost" aria-label="Add image">
                        <LuImagePlus />
                    </IconButton>
                    <IconButton variant="ghost" aria-label="Record audio">
                        <LuMic />
                    </IconButton>


                    <IconButton 
                        onClick={submitNewMessage}
                        isDisabled={!newMessage.trim()}
                        aria-label="Send message"
                        // type="submit"
                    >
                        <LuSendHorizontal />
                        
                    </IconButton>
                </HStack>
                
            </Flex>
        </Container>
    )
    
}

export default ChatInput