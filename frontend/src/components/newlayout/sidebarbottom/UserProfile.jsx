import { Box, HStack, Text, IconButton } from '@chakra-ui/react'
import { UserMenu } from './UserMenu'
// import useAuth from '@/hooks/useAuth'
import { Avatar } from "@/components/ui/avatar"
import { LuEllipsisVertical } from 'react-icons/lu'
    
export const UserProfile = ({ isCollapsed = false }) => {
    // const { user, logout } = useAuth()
    const user = {
        email: 'test@test.com'
    }
    const logout = () => {
        console.log('mimic logout')
    }

    const avatarSrc = `https://api.dicebear.com/9.x/thumbs/svg?seed=${user?.email}`

    if (isCollapsed) {
        return <UserMenu logout={logout} isCollapsed={isCollapsed} />
    }

    return (
        <HStack gap="3" justify="space-between">
            <HStack gap="3">
                <Avatar src={avatarSrc} />
                <Box>
                    <Text textStyle="sm" fontWeight="medium">
                        {user?.email}
                    </Text>
                </Box>
            </HStack>

            {/* <UserMenu logout={logout} isCollapsed={isCollapsed} /> */}
            <IconButton variant="ghost" colorPalette="gray" aria-label="Open Menu">
                <LuEllipsisVertical />
            </IconButton>
        </HStack>
    )
}