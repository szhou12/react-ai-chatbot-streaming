import { 
    Box
} from '@chakra-ui/react'

import Chatbot from './Chatbot'
import Chatbot2 from './Chatbot2'

export const IndexPage = () => {
    return (
        <Box height="100vh" width="100%">
            <Chatbot2 />
        </Box>
    )
}