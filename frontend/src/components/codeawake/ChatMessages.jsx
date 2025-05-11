import { 
    Box,
    Flex,
    VStack,
    Spinner,
    Icon,
    Image,
    Text,
} from "@chakra-ui/react"
import { Prose } from "@/components/ui/prose"
import Markdown from "react-markdown"
import { FaUser, FaExclamationCircle } from "react-icons/fa"

import useAutoScroll from "@/hooks/useAutoScroll"


function ChatMessages({ messages, isLoading }) {
    const scrollContentRef = useAutoScroll(isLoading)

    return (
        <Box ref={scrollContentRef} flex="1">
            <VStack spacing={4} align="stretch">
                {messages.map(({ role, content, loading, error }, idx) => (
                    <Flex
                        key={idx}
                        align="flex-start"
                        gap={4}
                        py={4}
                        px={3}
                        borderRadius="xl"
                        bg={role === "user" ? "gray.50" : "transparent"}
                    >
                        {role === "user" && (
                            <Icon size="lg" color="pink.700">
                                <FaUser />
                            </Icon>
                        )}

                        <Box>
                            <Box>
                                {loading && !content ? (
                                    <Spinner/>
                                ) : role === "assistant" ? (
                                    <Prose mx="auto">
                                        <Markdown>{content}</Markdown>
                                    </Prose>
                                    
                                ) : (
                                    <Text whiteSpace="pre-line">{content}</Text>
                                )}
                            </Box>

                            {error && (
                                <Flex
                                    align="center"
                                    gap={1}
                                    fontSize="sm"
                                    color="red.500"
                                    mt={content ? 2 : 0}
                                >
                                    <Icon size="lg">
                                        <FaExclamationCircle />
                                    </Icon>
                                    <Text>Error generating the response</Text>
                                </Flex>   
                            )}

                        </Box>

                    </Flex>
                ))}
            </VStack>

        </Box>
    )
}

export default ChatMessages