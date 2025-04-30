import { Avatar, Box, HStack, Stack, Text } from '@chakra-ui/react'

export const ChatMessage = (props) => {
    const { author, messages } = props

    // Debug logging
    console.log('ChatMessage props:', { author, messages })
    console.log('Messages type:', typeof messages)
    console.log('author type:', typeof author)
    console.log('Is messages array?', Array.isArray(messages))

    return (
        <HStack align="flex-start" gap="5">
            <Box pt="1">
                <Avatar size="sm" src={author.image} name={author.name} />
            </Box>

            <Stack spacing="1">
                <Text fontWeight="medium">{author.name}</Text>
                <Stack spacing="2">
                    {messages.map((message, index) => (
                        <Box key={index} color="fg.muted" lineHeight="tall">
                            {message}
                        </Box>
                    ))}
                </Stack>

            </Stack>

        </HStack>
    )
}