import { 
    Box, 
    Text,
    Flex,
    Textarea,
} from '@chakra-ui/react';

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

const Content2 = (props) => {

    return (
        <Flex
            direction="column" 
            height="100%"
            {...props}
        >
            {/* Sticky Header */}
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
                p={4}
            >
                <Text>Main Content Area</Text>
            </Box>

            {/* Sticky Textarea */}
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

        </Flex>
    )

}

export { Content, Content2 }