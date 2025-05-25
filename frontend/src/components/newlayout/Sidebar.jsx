import { Box, Text } from '@chakra-ui/react';
import { ThreeLayerLayout } from './ThreeLayerLayout'

const Sidebar = (props) => {
    return (
        <Box
            borderRightWidth="4px"
            bg="blue.500"
            css={{
                backgroundClip: 'padding-box',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.2' fillRule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
                display: 'flex',
                width: '100%',
            }}
            {...props}
        >
            <Text> Sidebar </Text>
        </Box>
    )
}

/**
 * 3-layer structure
 */
const Sidebar2 = () => {
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
                <Text> Footer </Text>
            </Box>

        </>
    )
}

/**
 * 3-layer structure abstraction
 */
const Sidebar3 = () => {
    const Top = () => {
        return (
            <Text> Sidebar Header </Text>
        )
    }

    const Main = () => {
        return (
            <Text> Sidebar Main </Text>
        )
    }

    const Bottom = () => {
        return (
            <Text> Sidebar Footer </Text>
        )
    }
    
    return (
        <ThreeLayerLayout
            top={<Top />}
            topProps={{bg: 'pink.500'}}
            main={<Main />}
            mainProps={{bg: 'blue.500'}}
            bottom={<Bottom />}
            bottomProps={{bg: 'green.500', borderTopWidth:"1px", p:4}}
        />
    )
}

const Sidebar4 = () => {
    return (
        
    )
}

export { Sidebar, Sidebar2, Sidebar3 }