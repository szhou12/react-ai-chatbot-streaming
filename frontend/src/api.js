const BASE_URL = import.meta.env.VITE_API_URL

async function createChat() {

    // TODO: configure URL address properly
    const response = await fetch(BASE_URL + '/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await response.json()

    if (!response.ok) {
        return Promise.reject({ status: response.status, data })
    }

    return data
    
}

async function sendChatMessage(chatId, message) {
    const response = await fetch(BASE_URL + `/c/${chatId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })

    if (!response.ok) {
        return Promise.reject({ status: response.status, data: await response.json() })
    }

    return response.body
}

export default {
    createChat,
    sendChatMessage
}