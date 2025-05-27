import { 
    Box, 
    Stack,
    StackSeparator,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react'

import {
    LuBookmark,
    LuClock,
    LuCircleHelp,
    LuLayoutDashboard,
    LuChartPie,
    LuSettings,
  } from 'react-icons/lu'

import { ThreeLayerLayout } from './ThreeLayerLayout'
import { SidebarFooter } from './sidebarbottom/SidebarFooter'
import { SidebarIcons } from './sidebartop/SidebarIcons'
import { SidebarContent } from './sidebarmain/SidebarContent'
import { SearchField } from './template/SearchField'
import { UserProfile } from './template/UserProfile'
import { SidebarLink } from './template/SidebarLink'

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

/**
 * 3-layer structure abstraction with implemented components
 */
const CollapsibleSidebar = () => {

    const [sidebarSize, setSidebarSize] = useState("large")

    const toggleSidebar = () => {
        setSidebarSize(sidebarSize === "small" ? "large" : "small");
    }


    const Top = () => {
        return (
            <SidebarIcons 
                isCollapsed={sidebarSize === "small"} 
                onToggleSidebar={toggleSidebar} 
            />
        )
    }

    const Main = () => {
        return (
            <>
                {sidebarSize === "large" && <SidebarContent />}
            </>
        )
    }

    const Bottom = () => {
        return (
            <SidebarFooter isCollapsed={sidebarSize === "small"} />
        )
    }
    
    return (
        // <Stack
        //     maxW="xs"
        //     overflow="hidden"
        // >
        //     <ThreeLayerLayout
        //         top={<Top />}
        //         topProps={{bg: 'pink.500'}}
        //         main={<Main />}
        //         mainProps={{bg: 'blue.500'}}
        //         bottom={<Bottom />}
        //         bottomProps={{bg: 'green.500', borderTopWidth:"1px", p:4}}
        //     />

        // </Stack>

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

const TemplateSidebar = (props) => {
    return (
        <Stack
            flex="1"
            p={{ base: '4', md: '6' }}
            bg="blue.500"
            borderRightWidth="1px"
            justifyContent="space-between"
            maxW="xs"
            {...props}
        >
            <Stack gap="6" bg="red.500">
                <Text style={{alignSelf: 'start'}}>Logo placeholder</Text>
                <SearchField />

                <Stack gap="1">
                    <SidebarLink>
                        <LuLayoutDashboard /> Dashboard
                    </SidebarLink>
                    <SidebarLink aria-current="page">
                        <LuChartPie /> Analysis
                    </SidebarLink>
                    {/* <DocumentsLinks /> */}
                    <SidebarLink>
                        <LuClock /> History
                    </SidebarLink>
                    <SidebarLink>
                        <LuBookmark /> Favorites
                    </SidebarLink>
                </Stack>
            </Stack>

            <Stack gap="4" separator={<StackSeparator />}>
                <Box />
                <Stack gap="1">
                    <SidebarLink>
                        <LuCircleHelp /> Help Center
                    </SidebarLink>
                    <SidebarLink>
                        <LuSettings /> Settings
                    </SidebarLink>
                </Stack>
                <UserProfile />
            </Stack>

        </Stack>
    )
}

const TemplateSidebarThreeLayer = () => {
    const [sidebarSize, setSidebarSize] = useState("large")

    const toggleSidebar = () => {
        setSidebarSize(sidebarSize === "small" ? "large" : "small");
    }

    const Top = () => {
        const templateContent = () => {
            return (
                <>
                    <Text style={{alignSelf: 'start'}}>Logo placeholder</Text>
                    <SearchField />
                </>
            )
        }

        return (
            // templateContent()
            <SidebarIcons 
                isCollapsed={sidebarSize === "small"} 
                onToggleSidebar={toggleSidebar} 
            />
        )
    }

    const Main = () => {
        const templateContent = () => {
            return (
                <Stack gap="1" >
                    <Text fontSize="md" fontWeight="medium" alignSelf="start">
                        Conversations 14
                    </Text>

                    <SidebarLink>
                        <LuLayoutDashboard /> Dashboard
                    </SidebarLink>
                    <SidebarLink aria-current="page">
                        <LuChartPie /> Analysis
                    </SidebarLink>
                    {/* <DocumentsLinks /> */}
                    <SidebarLink>
                        <LuClock /> History
                    </SidebarLink>
                    <SidebarLink>
                        <LuBookmark /> Favorites
                    </SidebarLink>
                    <SidebarLink>
                        <LuBookmark /> Favorites
                    </SidebarLink>
                    <SidebarLink>
                        <LuBookmark /> Favorites
                    </SidebarLink>
                    <SidebarLink>
                        <LuBookmark /> Favorites
                    </SidebarLink>
                    <SidebarLink>
                        <LuBookmark /> Favorites
                    </SidebarLink>
                    <SidebarLink>
                        <LuBookmark /> Favorites
                    </SidebarLink>
                    <SidebarLink>
                        <LuBookmark /> Favorites
                    </SidebarLink>


                </Stack>
            )
        }

        return (
            // templateContent()
            <>
                {sidebarSize === "large" && <SidebarContent />}
            </>
        )
    }

    const Bottom = () => {
        const templateContent = () => {
            return (
                <Stack gap="4" separator={<StackSeparator />}>
                    <Box />
                    <Stack gap="1">
                        <SidebarLink>
                            <LuCircleHelp /> Help Center
                        </SidebarLink>
                        <SidebarLink>
                            <LuSettings /> Settings
                        </SidebarLink>
                    </Stack>
                    <UserProfile />
                </Stack>
            )
        }
        return (
            // templateContent()
            <SidebarFooter isCollapsed={sidebarSize === "small"} />
        )
    }

    return (
        <Stack
            flex="1"
            // p={{ base: '4', md: '6' }}
            bg="blue.500"
            borderRightWidth="1px"
            justifyContent="space-between"
            maxW="xs"
            overflow="hidden"
            // {...props}
        >
            <ThreeLayerLayout
                top={<Top />}
                topProps={{bg: 'pink.500'}}
                main={<Main />}
                mainProps={{bg: 'blue.500', w: "full"}}
                bottom={<Bottom />}
                bottomProps={{bg: 'green.500', borderTopWidth:"1px", p:4}}
            />
        </Stack>
        
        
    )
}

export { 
    Sidebar, 
    Sidebar2, 
    Sidebar3, 
    CollapsibleSidebar, 
    TemplateSidebar, 
    TemplateSidebarThreeLayer, 
}