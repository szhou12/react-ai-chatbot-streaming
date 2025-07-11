import { useEffect, useRef, useState } from 'react'
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
import useAutoScrollChat from "@/hooks/useAutoScrollChat"
import useAutoScrollGPT from "@/hooks/useAutoScrollGPT"
import useAutoScrollCursor from "@/hooks/useAutoScrollCursor"


export const ChatMessages = ({ messages, isLoading }) => {
    // const scrollContentRef = useAutoScrollCursor(isLoading)
    // const scrollContentRef = useAutoScrollGPT(isLoading)
    // const scrollContentRef = useAutoScrollChat(messages, isLoading)

    const messagesEndRef = useRef(null)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            })
        }, 100)

        return () => clearTimeout(timeoutId)
    }, [messages])


    return (
        <Box 
            // ref={scrollContentRef} 
            flex="1"
            overflowY="auto"  // Enable vertical scrolling
            height="100%"     // Take full height of parent
            position="relative" // For proper scroll positioning
        >
            
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
                                    <Spinner 
                                        color="teal.500"
                                        size="lg"
                                        css={{ "--spinner-track-color": "colors.gray.200" }}
                                    />
                                ) : role === "assistant" ? (
                                    <Prose mx="auto" textAlign="left">
                                        <Markdown>
                                            {content}
                                        </Markdown>
                                    </Prose>
                                    // <Text>
                                    //     {/* <Markdown>{content}</Markdown> */}
                                    //     {content}
                                    // </Text>
                                    
                                ) : (
                                    // user typed-in message
                                    <Text 
                                        textAlign="left"
                                        // whiteSpace="pre-line"
                                        whiteSpace="pre-wrap"     // Preserve line breaks and wrap text
                                        wordBreak="break-word"    // Break long words if necessary
                                        overflowWrap="break-word" // Ensure long words don't overflow
                                    >
                                        {content}
                                    </Text>
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
                                    <Text textAlign="left">Error generating the response</Text>
                                </Flex>   
                            )}

                        </Box>

                    </Flex>
                ))}
            </VStack>
            
            <Box
                ref={messagesEndRef} 
                paddingBottom="10" // decides how much bottom empty space will show
                height="1px"
                width="100%"
                bg="gray.200"
            />
        </Box>
    )

}
