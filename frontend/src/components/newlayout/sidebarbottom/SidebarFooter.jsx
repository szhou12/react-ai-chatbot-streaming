import { Box, Stack, StackSeparator } from '@chakra-ui/react'
import { LuCircleHelp, LuLayoutDashboard, LuSettings } from 'react-icons/lu'

import { SidebarLink } from './SidebarLink'
import { UserProfile } from './UserProfile'

// TODO: use hook to get role, link the dashboard
export const SidebarFooter = ({ isCollapsed = false, ...props }) => {
    const role = "admin"

    return (
        <Stack gap="4" separator={<StackSeparator />} {...props}>
            <Box /> {/* Spacer */}
            
            {!isCollapsed && (
                <Stack gap="1">
                    
                    {role !== "client" && (
                        <SidebarLink>
                            <LuLayoutDashboard /> Staff Dashboard
                        </SidebarLink>
                    )}

                    <SidebarLink>
                        <LuCircleHelp /> Help Center
                    </SidebarLink>

                    <SidebarLink>
                        <LuSettings /> Settings
                    </SidebarLink>
                </Stack>
            )}

            <UserProfile isCollapsed={isCollapsed} />
        </Stack>
    )
}