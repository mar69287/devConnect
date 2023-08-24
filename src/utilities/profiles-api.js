import sendRequest from './send-request'
const BASE_URL = '/api/profiles'

export async function createProfile(profileData) {
    console.log('here at profile api', profileData)
    return sendRequest(`${BASE_URL}/create`, 'POST', profileData)
}

export async function getProfile() {
    return sendRequest(BASE_URL)
}