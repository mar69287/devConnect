import sendRequest from './send-request'
const BASE_URL = '/api/profiles'

export async function createProfile(profileData) {
    return sendRequest(`${BASE_URL}/create`, 'POST', profileData)
}

export async function getProfile(value) {
    console.log(value)
    return sendRequest(BASE_URL)
}

export async function addFollowing(profileId, postProfileId) {
    return sendRequest(`${BASE_URL}/${profileId}/following/${postProfileId}`, 'POST')
}

export async function deleteFollowing(profileId, postProfileId) {
    return sendRequest(`${BASE_URL}/${profileId}/following/${postProfileId}`, 'DELETE')
}