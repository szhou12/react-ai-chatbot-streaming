import { Box, Stack, StackSeparator } from '@chakra-ui/react'

export const ChatMessages = (props) => {
    return (
        <Stack
            maxW="prose"
            max="auto"
            paddingX={{base: '4', md: '0'}}
            // divideColor={
            //     <Box marginLeft="14!">
            //         <StackSeparator />
            //     </Box>
            // }
            separator={<StackSeparator />}
            spacing="10"
            {...props}
        />
    )
}