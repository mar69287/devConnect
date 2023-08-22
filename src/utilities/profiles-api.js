import sendRequest from './send-request'
const BASE_URL = '/api/profiles'

export async function createProfile(profileData) {
    // console.log(profileData)
    return sendRequest(`${BASE_URL}/create`, 'POST', profileData)
}