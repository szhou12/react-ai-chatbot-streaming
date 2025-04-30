import { Button, Icon } from '@chakra-ui/react'

export function ChatActionButton(props) {
    const { icon, children, ...rest } = props
    return (
        <Button
            bg="bg"
            size="sm"
            variant="secondary"
            {...rest}
            leftIcon={<Icon as={icon} color="fg.subtle"/>}
        >
            {children}
        </Button>
    )
}