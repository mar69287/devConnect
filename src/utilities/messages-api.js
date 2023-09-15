import sendRequest from './send-request'
const BASE_URL = '/api/messages'

export async function authenticate(userData) {
    // console.log(userData)
    return sendRequest(`${BASE_URL}/authenticate`, 'POST', userData)
}
