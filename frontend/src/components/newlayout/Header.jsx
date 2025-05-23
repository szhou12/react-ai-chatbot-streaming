import { Box, Text } from '@chakra-ui/react';

export const Header = (props) => {
    return (
        <Box 
            minH="40"
            borderBottomWidth="1px"
            bg="red.500"
            css={{
                backgroundClip: 'padding-box',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fillRule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                display: 'flex',
                width: '100%',
            }}
            {...props}
        >
            <Text> Header </Text>
        </Box>
    )
}